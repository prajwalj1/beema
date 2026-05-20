import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import PreProposal from "@/models/PreProposal";
import User from "@/models/User";
import Policy from "@/models/Policy";
import Payment from "@/models/Payment";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const {
      sumAssured,
      policyTerm,
      premiumMode,
      fullName,
      email,
      phone,
      dob,
      gender,
      maritalStatus,
      education,
      nationality,
      personalPhoto,
      identityDocType,
      identityDocNo,
      identityDocFront,
      identityDocBack,
      identityDocIssuedDate,
      identityDocIssuedPlace,
      fatherName,
      motherName,
      grandfatherName,
      spouseName,
      permState,
      permDistrict,
      permMunicipality,
      permWard,
      permStreet,
      tempState,
      tempDistrict,
      tempMunicipality,
      tempWard,
      tempStreet,
      isSameAddress,
      height,
      weight,
      tobaccoUse,
      medicalConditions,
      nomineeName,
      nomineeRelation,
      nomineePhone,
      nomineeIdType,
      nomineeIdNo,
      nomineeIdIssuedDate,
      nomineeIdIssuedPlace,
      nomineePhoto,
      nomineeIdFront,
      nomineeIdBack
    } = body;

    // Validation for all mandatory fields
    if (
      !sumAssured ||
      !policyTerm ||
      !premiumMode ||
      !fullName ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !maritalStatus ||
      !education ||
      !nationality ||
      !personalPhoto ||
      !identityDocType ||
      !identityDocNo ||
      !identityDocFront ||
      !identityDocBack ||
      !identityDocIssuedDate ||
      !identityDocIssuedPlace ||
      !fatherName ||
      !motherName ||
      !grandfatherName ||
      !permState ||
      !permDistrict ||
      !permMunicipality ||
      !permWard ||
      !permStreet ||
      !tempState ||
      !tempDistrict ||
      !tempMunicipality ||
      !tempWard ||
      !tempStreet ||
      !height ||
      !weight ||
      tobaccoUse === undefined ||
      !nomineeName ||
      !nomineeRelation ||
      !nomineePhone ||
      !nomineeIdType ||
      !nomineeIdNo ||
      !nomineeIdIssuedDate ||
      !nomineeIdIssuedPlace ||
      !nomineePhoto ||
      !nomineeIdFront ||
      !nomineeIdBack
    ) {
      return NextResponse.json(
        { error: "Please fill in all mandatory fields." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Link user if logged in
    let userId = null;
    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        userId = user._id;
      }
    }

    const proposal = await PreProposal.create({
      userId,
      sumAssured: Number(sumAssured),
      policyTerm: Number(policyTerm),
      premiumMode,
      fullName,
      email: email.toLowerCase(),
      phone,
      dob: new Date(dob),
      gender,
      maritalStatus,
      education,
      nationality,
      personalPhoto,
      identityDocType,
      identityDocNo,
      identityDocFront,
      identityDocBack,
      identityDocIssuedDate: new Date(identityDocIssuedDate),
      identityDocIssuedPlace,
      fatherName,
      motherName,
      grandfatherName,
      spouseName: maritalStatus === "married" ? spouseName : undefined,
      permState,
      permDistrict,
      permMunicipality,
      permWard,
      permStreet,
      tempState,
      tempDistrict,
      tempMunicipality,
      tempWard,
      tempStreet,
      isSameAddress: Boolean(isSameAddress),
      height: Number(height),
      weight: Number(weight),
      tobaccoUse: Boolean(tobaccoUse),
      medicalConditions: medicalConditions || "None",
      nomineeName,
      nomineeRelation,
      nomineePhone,
      nomineeIdType,
      nomineeIdNo,
      nomineeIdIssuedDate: new Date(nomineeIdIssuedDate),
      nomineeIdIssuedPlace,
      nomineePhoto,
      nomineeIdFront,
      nomineeIdBack
    });

    // Automatically create a corresponding Policy and initial premium Payment in the database if userId is present
    if (userId) {
      const generatedPolicyNumber = "POL-" + Math.floor(100000 + Math.random() * 900000);
      const generatedTransactionId = "TXN-" + Math.floor(100000 + Math.random() * 900000);

      // Premium calculation logic based on sumAssured and policyTerm
      const termYears = Number(policyTerm) || 15;
      const totalAssured = Number(sumAssured) || 500000;
      let calculatedPremium = totalAssured / termYears; // Annual base
      if (premiumMode === "quarterly") {
        calculatedPremium = calculatedPremium / 4;
      } else if (premiumMode === "monthly") {
        calculatedPremium = calculatedPremium / 12;
      }
      calculatedPremium = Math.round(calculatedPremium);

      const expDate = new Date();
      expDate.setFullYear(expDate.getFullYear() + termYears);

      const policyObj = await Policy.create({
        userId,
        preProposalId: proposal._id,
        policyNumber: generatedPolicyNumber,
        planName: "Dream Policy - Life Insurance",
        provider: "Beema Dukaan",
        sumAssured: totalAssured,
        premium: calculatedPremium,
        premiumMode,
        status: "Active",
        expiryDate: expDate,
      });

      const paymentMethods = ["eSewa", "Khalti", "ConnectIPS", "Visa Card"];
      const randomMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

      await Payment.create({
        userId,
        policyId: policyObj._id,
        policyNumber: generatedPolicyNumber,
        transactionId: generatedTransactionId,
        amount: calculatedPremium,
        paymentMethod: randomMethod,
        status: "Success",
      });
    }

    return NextResponse.json(
      { message: "Pre-proposal submitted successfully!", proposalId: proposal._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Pre-proposal creation error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred on the server." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const proposals = await PreProposal.find({ userId: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(proposals);
  } catch (error) {
    console.error("GET Pre-proposals error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred on the server." },
      { status: 500 }
    );
  }
}
