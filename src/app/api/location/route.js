import { NextResponse } from "next/server";

export async function GET() {
  const locationData = {
    provinces: [
      {
        id: "Koshi Province",
        name: "Koshi Province",
        districts: [
          {
            name: "Taplejung",
            municipalities: ["Phungling Municipality", "Athrai Tribeni Rural Municipality", "Sidingwa Rural Municipality", "Faktanglung Rural Municipality", "Mikwakhola Rural Municipality", "Meringden Rural Municipality", "Maiwakhola Rural Municipality", "Pathibhara Yangwarak Rural Municipality", "Sirijangha Rural Municipality"]
          },
          {
            name: "Panchthar",
            municipalities: ["Phidim Municipality", "Falelung Rural Municipality", "Falgunanda Rural Municipality", "Hilihang Rural Municipality", "Kummayak Rural Municipality", "Miklajung Rural Municipality", "Tumbewa Rural Municipality", "Yangwarak Rural Municipality"]
          },
          {
            name: "Ilam",
            municipalities: ["Ilam Municipality", "Deumai Municipality", "Mai Municipality", "Suryodaya Municipality", "Fakphokthum Rural Municipality", "Chulachuli Rural Municipality", "Mai Jogmai Rural Municipality", "Mangsebung Rural Municipality", "Rong Rural Municipality", "Sandakpur Rural Municipality"]
          },
          {
            name: "Jhapa",
            municipalities: ["Bhadrapur Municipality", "Birtamod Municipality", "Damak Municipality", "Gauradaha Municipality", "Mechinagar Municipality", "Arjundhara Municipality", "Kankai Municipality", "Shivasatakshi Municipality", "Kamal Rural Municipality", "Buddhashanti Rural Municipality", "Kachankawal Rural Municipality", "Gauriganj Rural Municipality", "Barhadashi Rural Municipality", "Jhapa Rural Municipality", "Haldibari Rural Municipality"]
          },
          {
            name: "Morang",
            municipalities: ["Biratnagar Metropolitan City", "Belbari Municipality", "Letang Municipality", "Pathari Sanischare Municipality", "Rangeli Municipality", "Ratuwamai Municipality", "Sunbarsa Municipality", "Urlabari Municipality", "Sundar Haraicha Municipality", "Budhiganga Rural Municipality", "Dhanpalthan Rural Municipality", "Gramthan Rural Municipality", "Jahada Rural Municipality", "Kanepokhari Rural Municipality", "Katahari Rural Municipality", "Kerabari Rural Municipality", "Miklajung Rural Municipality"]
          },
          {
            name: "Sunsari",
            municipalities: ["Dharan Sub-Metropolitan City", "Itahari Sub-Metropolitan City", "Inaruwa Municipality", "Duhabi Municipality", "Ramdhuni Municipality", "Barahachhetra Municipality", "Devanganj Rural Municipality", "Koshi Rural Municipality", "Gadhi Rural Municipality", "Bhokraha Narsingh Rural Municipality", "Harinagara Rural Municipality", "Dewanganj Rural Municipality"]
          },
          {
            name: "Dhankuta",
            municipalities: ["Dhankuta Municipality", "Pakhribas Municipality", "Mahalaxmi Municipality", "Sangurigadhi Rural Municipality", "Chaubise Rural Municipality", "Sahidbhumi Rural Municipality", "Chhathar Jiri Khikti Rural Municipality"]
          },
          {
            name: "Terhathum",
            municipalities: ["Myanglung Municipality", "Laligurans Municipality", "Aathrai Rural Municipality", "Chhathar Rural Municipality", "Phedap Rural Municipality", "Menchayam Rural Municipality"]
          },
          {
            name: "Bhojpur",
            municipalities: ["Bhojpur Municipality", "Shadanand Municipality", "Arun Rural Municipality", "Aamchok Rural Municipality", "Hatuwagadhi Rural Municipality", "Pauwadunma Rural Municipality", "Ramprasad Rai Rural Municipality", "Salpasilichho Rural Municipality", "Tyamke Maiyum Rural Municipality"]
          },
          {
            name: "Sankhuwasabha",
            municipalities: ["Khandbari Municipality", "Madi Municipality", "Chainpur Municipality", "Dharmadevi Municipality", "Panchkhapan Municipality", "Bhotkhola Rural Municipality", "Chichila Rural Municipality", "Makalu Rural Municipality", "Sabhapokhari Rural Municipality", "Silichong Rural Municipality"]
          },
          {
            name: "Solukhumbu",
            municipalities: ["Solu Dudhkunda Municipality", "Khumbu Pasanglhamu Rural Municipality", "Necha Salyan Rural Municipality", "Mapya Dudhkoshi Rural Municipality", "Mahakulung Rural Municipality", "Sotang Rural Municipality", "Likhupike Rural Municipality", "Thulung Dudhkoshi Rural Municipality"]
          },
          {
            name: "Khotang",
            municipalities: ["Diktel Rupakot Majhuwagadhi Municipality", "Halesi Tuwachung Municipality", "Ainselukharka Rural Municipality", "Barahapokhari Rural Municipality", "Khotehang Rural Municipality", "Kepilasgadhi Rural Municipality", "Jante Dhunga Rural Municipality", "Diprung Chuichumma Rural Municipality", "Rawabesi Rural Municipality", "Sakela Rural Municipality"]
          },
          {
            name: "Okhaldhunga",
            municipalities: ["Siddhicharan Municipality", "Khijidemba Rural Municipality", "Champadevi Rural Municipality", "Chishankhugadhi Rural Municipality", "Manebhanjyang Rural Municipality", "Molung Rural Municipality", "Likhu Rural Municipality", "Soniya Rural Municipality"]
          },
          {
            name: "Udayapur",
            municipalities: ["Triyuga Municipality", "Katari Municipality", "Chaudandigadhi Municipality", "Belaka Municipality", "Udayapurgadhi Rural Municipality", "Tapli Rural Municipality", "Rautamai Rural Municipality", "Limchungbung Rural Municipality"]
          }
        ]
      },
      {
        id: "Madhesh Province",
        name: "Madhesh Province",
        districts: [
          {
            name: "Saptari",
            municipalities: ["Rajbiraj Municipality", "Kanchanrup Municipality", "Dakneshwari Municipality", "Bodebarsain Municipality", "Hanumanagar Kankalini Municipality", "Shambhunath Municipality", "Surunga Municipality", "Balan-Bihul Rural Municipality", "Bishnupur Rural Municipality", "Chhinnamasta Rural Municipality", "Rupani Rural Municipality", "Agnisair Krishna Savaran Rural Municipality", "Mahadeva Rural Municipality", "Tirahut Rural Municipality", "Tilathi Koiladi Rural Municipality"]
          },
          {
            name: "Siraha",
            municipalities: ["Siraha Municipality", "Lahan Municipality", "Golbazar Municipality", "Mirchaiya Municipality", "Sukhipur Municipality", "Dhangadhimai Municipality", "Kalyanpur Municipality", "Karjanha Municipality", "Bariarpatti Rural Municipality", "Aurahi Rural Municipality", "Arnama Rural Municipality", "Bhagwanpur Rural Municipality", "Naraha Rural Municipality", "Navarajpur Rural Municipality", "Sakhuwanankarkatti Rural Municipality", "Laxmipur Patari Rural Municipality"]
          },
          {
            name: "Dhanusha",
            municipalities: ["Janakpurdham Sub-Metropolitan City", "Dhanushadham Municipality", "Chhireswarnath Municipality", "Ganeshman Charnath Municipality", "Mithila Municipality", "Sabaila Municipality", "Nagrain Municipality", "Kamala Municipality", "Mithila Bihari Municipality", "Hansapur Municipality", "Aurahi Rural Municipality", "Bateshwar Rural Municipality", "Janaknandani Rural Municipality", "Lakshminiya Rural Municipality", "Mukhiyapatti Musharniya Rural Municipality", "Tulsiyalhi Rural Municipality"]
          },
          {
            name: "Mahottari",
            municipalities: ["Jaleshwar Municipality", "Bardibas Municipality", "Gaushala Municipality", "Loharpatti Municipality", "Ramgopalpur Municipality", "Manra Siswa Municipality", "Matihani Municipality", "Bhangaha Municipality", "Balawa Municipality", "Ekdara Rural Municipality", "Pipra Rural Municipality", "Mahottari Rural Municipality", "Samsi Rural Municipality", "Sonama Rural Municipality"]
          },
          {
            name: "Sarlahi",
            municipalities: ["Malangwa Municipality", "Hariwon Municipality", "Lalbandi Municipality", "Ishworpur Municipality", "Bagmati Municipality", "Barahathawa Municipality", "Godaita Municipality", "Balara Municipality", "Kabilasi Municipality", "Haripur Municipality", "Haripurwa Municipality", "Chakraghatta Rural Municipality", "Dhankaul Rural Municipality", "Chandranagar Rural Municipality", "Bramhapuri Rural Municipality", "Ramnagar Rural Municipality"]
          },
          {
            name: "Rautahat",
            municipalities: ["Gaur Municipality", "Chandrapur Municipality", "Garuda Municipality", "Gujara Municipality", "Katariya Municipality", "Gadhimai Municipality", "Madhav Narayan Municipality", "Ishanath Municipality", "Maulapur Municipality", "Paroha Municipality", "Rajpur Municipality", "Phattuwa Vijayapur Municipality", "Brindaban Municipality", "Rajdevi Municipality", "Dewahi Gonahi Municipality", "Yamunamai Rural Municipality", "Durga Bhagwati Rural Municipality"]
          },
          {
            name: "Bara",
            municipalities: ["Kalaiya Sub-Metropolitan City", "Simara Jitpur Sub-Metropolitan City", "Kolhabi Municipality", "Nijgadh Municipality", "Mahagadhimai Municipality", "Simroungadh Municipality", "Pachrauta Municipality", "Devtal Rural Municipality", "Karaiyamai Rural Municipality", "Prasouni Rural Municipality", "Pheta Rural Municipality", "Baragadhi Rural Municipality", "Suwarna Rural Municipality"]
          },
          {
            name: "Parsa",
            municipalities: ["Birgunj Metropolitan City", "Pokhariya Municipality", "Bahudarmai Municipality", "Parsagadhi Municipality", "Jagarnathpur Rural Municipality", "Chhipahamai Rural Municipality", "Biranchibarwa Rural Municipality", "Vindabasini Rural Municipality", "Patarki Sugauli Rural Municipality", "Zirabhawani Rural Municipality", "Thori Rural Municipality", "Pakaha Mainpur Rural Municipality"]
          }
        ]
      },
      {
        id: "Bagmati Province",
        name: "Bagmati Province",
        districts: [
          {
            name: "Kathmandu",
            municipalities: ["Kathmandu Metropolitan City", "Kirtipur Municipality", "Budhanilkantha Municipality", "Tarakeshwar Municipality", "Gokarneshwar Municipality", "Shankharapur Municipality", "Tokha Municipality", "Kageshwari Manohara Municipality", "Nagarjun Municipality", "Chandragiri Municipality", "Dakshinkali Municipality"]
          },
          {
            name: "Lalitpur",
            municipalities: ["Lalitpur Metropolitan City", "Mahalaxmi Municipality", "Godawari Municipality", "Konjyosom Rural Municipality", "Bagmati Rural Municipality", "Mahankal Rural Municipality"]
          },
          {
            name: "Bhaktapur",
            municipalities: ["Bhaktapur Municipality", "Madhyapur Thimi Municipality", "Changunarayan Municipality", "Suryabinayak Municipality"]
          },
          {
            name: "Chitwan",
            municipalities: ["Bharatpur Metropolitan City", "Ratnanagar Municipality", "Khairahani Municipality", "Rapti Municipality", "Kalika Municipality", "Madi Municipality", "Ichyakamana Rural Municipality"]
          },
          {
            name: "Kavrepalanchok",
            municipalities: ["Dhulikhel Municipality", "Banepa Municipality", "Panauti Municipality", "Panchkhal Municipality", "Namobuddha Municipality", "Mandandeupur Municipality", "Bhumlu Rural Municipality", "Chauri Deurali Rural Municipality", "Temal Rural Municipality", "Bethanchowk Rural Municipality", "Khanikhola Rural Municipality", "Mahabharat Rural Municipality", "Roshi Rural Municipality"]
          },
          {
            name: "Dhading",
            municipalities: ["Nilkantha Municipality", "Dhunibeshi Municipality", "Gajuri Rural Municipality", "Benighat Rorang Rural Municipality", "Galchhi Rural Municipality", "Thakre Rural Municipality", "Siddhalekh Rural Municipality", "Jwalamukhi Rural Municipality", "Tripurasundari Rural Municipality", "Gangajamuna Rural Municipality", "Netrawati Dabjong Rural Municipality", "Khaniyabas Rural Municipality", "Ruby Valley Rural Municipality"]
          },
          {
            name: "Nuwakot",
            municipalities: ["Bidur Municipality", "Belkotgadhi Municipality", "Kakani Rural Municipality", "Dupcheshwar Rural Municipality", "Shivapuri Rural Municipality", "Tadi Rural Municipality", "Suryagadhi Rural Municipality", "Likhubise Rural Municipality", "Panchakanya Rural Municipality", "Tarkeshwar Rural Municipality", "Myagang Rural Municipality", "Kispang Rural Municipality"]
          },
          {
            name: "Rasuwa",
            municipalities: ["Gosaikunda Rural Municipality", "Uttargaya Rural Municipality", "Kalika Rural Municipality", "Naukunda Rural Municipality", "Parbatikunda Rural Municipality"]
          },
          {
            name: "Sindhupalchok",
            municipalities: ["Chautara Sangachowkgadhi Municipality", "Melamchi Municipality", "Barhabise Municipality", "Helambu Rural Municipality", "Panchpokhari Thangpal Rural Municipality", "Indrawati Rural Municipality", "Balephi Rural Municipality", "Jugal Rural Municipality", "Bhotekoshi Rural Municipality", "Sunkoshi Rural Municipality", "Lisankhu Pakhar Rural Municipality", "Tripurasundari Rural Municipality"]
          },
          {
            name: "Dolakha",
            municipalities: ["Bhimeshwar Municipality", "Jiri Municipality", "Kalinchowk Rural Municipality", "Gaurishankar Rural Municipality", "Bigu Rural Municipality", "Sailung Rural Municipality", "Melung Rural Municipality", "Tamankoshi Rural Municipality", "Baiteshwar Rural Municipality"]
          },
          {
            name: "Ramechhap",
            municipalities: ["Manthali Municipality", "Ramechhap Municipality", "Khandadevi Rural Municipality", "Sunapati Rural Municipality", "Doramba Rural Municipality", "Gokulganga Rural Municipality", "Umakunda Rural Municipality", "Likhu Tamakoshi Rural Municipality"]
          },
          {
            name: "Sindhuli",
            municipalities: ["Kamalamai Municipality", "Dudhauli Municipality", "Golanjor Rural Municipality", "Hariharpurgadhi Rural Municipality", "Marin Rural Municipality", "Ghyanglekh Rural Municipality", "Tinpatan Rural Municipality", "Phikkal Rural Municipality", "Sunkoshi Rural Municipality"]
          },
          {
            name: "Makwanpur",
            municipalities: ["Hetauda Sub-Metropolitan City", "Thaha Municipality", "Bakaiya Rural Municipality", "Bagmati Rural Municipality", "Manahari Rural Municipality", "Raksirang Rural Municipality", "Kailash Rural Municipality", "Bhimphedi Rural Municipality", "Makawanpurgadhi Rural Municipality", "Indrasarowar Rural Municipality"]
          }
        ]
      },
      {
        id: "Gandaki Province",
        name: "Gandaki Province",
        districts: [
          {
            name: "Kaski",
            municipalities: ["Pokhara Metropolitan City", "Annapurna Rural Municipality", "Machhapuchchhre Rural Municipality", "Madi Rural Municipality", "Rupa Rural Municipality"]
          },
          {
            name: "Tanahun",
            municipalities: ["Vyas Municipality", "Bhanu Municipality", "Bhimad Municipality", "Shuklagandaki Municipality", "Anbu Khaireni Rural Municipality", "Bandipur Rural Municipality", "Devghat Rural Municipality", "Myagde Rural Municipality", "Rishing Rural Municipality", "Ghirang Rural Municipality"]
          },
          {
            name: "Syangja",
            municipalities: ["Putalibazar Municipality", "Waling Municipality", "Galyang Municipality", "Chhapakot Municipality", "Bhirkot Municipality", "Arjun Chaupari Rural Municipality", "Aandhikharka Rural Municipality", "Kaligandaki Rural Municipality", "Fedikhola Rural Municipality", "Harinas Rural Municipality", "Biruwa Rural Municipality"]
          },
          {
            name: "Gorkha",
            municipalities: ["Gorkha Municipality", "Palungtar Municipality", "Barpak Sulikot Rural Municipality", "Arughat Rural Municipality", "Siranchowk Rural Municipality", "Gandaki Rural Municipality", "Bhimsenthapa Rural Municipality", "Sahid Lakhan Rural Municipality", "Dharche Rural Municipality", "Chumnubri Rural Municipality", "Ajirkot Rural Municipality"]
          },
          {
            name: "Lamjung",
            municipalities: ["Besisahar Municipality", "Sundarbazar Municipality", "Rainas Municipality", "Madhya Nepal Municipality", "Marsyangdi Rural Municipality", "Dordi Rural Municipality", "Kwholasothar Rural Municipality", "Dudhpokhari Rural Municipality"]
          },
          {
            name: "Nawalparasi East",
            municipalities: ["Kawasoti Municipality", "Gaidakot Municipality", "Devchuli Municipality", "Madhyabindu Municipality", "Binayi Tribeni Rural Municipality", "Bulingtar Rural Municipality", "Bungdikali Rural Municipality", "Hupsekot Rural Municipality"]
          },
          {
            name: "Baglung",
            municipalities: ["Baglung Municipality", "Galkot Municipality", "Jaimini Municipality", "Dhorpatan Municipality", "Bareng Rural Municipality", "Badigad Rural Municipality", "Nisikhola Rural Municipality", "Kanthekhola Rural Municipality", "Tarakhola Rural Municipality", "Tamankhola Rural Municipality"]
          },
          {
            name: "Parbat",
            municipalities: ["Kushma Municipality", "Phalebas Municipality", "Jaljala Rural Municipality", "Modi Rural Municipality", "Mahashila Rural Municipality", "Bihadi Rural Municipality", "Paiyu Rural Municipality"]
          },
          {
            name: "Myagdi",
            municipalities: ["Beni Municipality", "Annapurna Rural Municipality", "Raghu Ganga Rural Municipality", "Mangala Rural Municipality", "Malika Rural Municipality", "Dhaulagiri Rural Municipality"]
          },
          {
            name: "Mustang",
            municipalities: ["Gharpajhong Rural Municipality", "Thasang Rural Municipality", "Baragung Muktikshetra Rural Municipality", "Lomanthang Rural Municipality", "Dalome Rural Municipality"]
          },
          {
            name: "Manang",
            municipalities: ["Chame Rural Municipality", "Manang Ngisyang Rural Municipality", "Narpa Bhumi Rural Municipality", "Naspa Rural Municipality"]
          }
        ]
      },
      {
        id: "Lumbini Province",
        name: "Lumbini Province",
        districts: [
          {
            name: "Rupandehi",
            municipalities: ["Butwal Sub-Metropolitan City", "Siddharthanagar Municipality", "Tilottama Municipality", "Devdaha Municipality", "Lumbini Sanskritik Municipality", "Sainamaina Municipality", "Gaidahawa Rural Municipality", "Kanchan Rural Municipality", "Kotahimai Rural Municipality", "Marchawari Rural Municipality", "Mayadevi Rural Municipality", "Omatiya Rural Municipality", "Rohini Rural Municipality", "Sammarimai Rural Municipality", "Siyari Rural Municipality", "Sudhodhan Rural Municipality"]
          },
          {
            name: "Kapilvastu",
            municipalities: ["Kapilvastu Municipality", "Banganga Municipality", "Buddhabhumi Municipality", "Shivaraj Municipality", "Krishnanagar Municipality", "Maharajgunj Municipality", "Mayadevi Rural Municipality", "Yashodhara Rural Municipality", "Suddhodhan Rural Municipality", "Bijaynagar Rural Municipality"]
          },
          {
            name: "Banke",
            municipalities: ["Nepalgunj Sub-Metropolitan City", "Kohalpur Municipality", "Rapti Sonari Rural Municipality", "Narainapur Rural Municipality", "Baijanath Rural Municipality", "Khajura Rural Municipality", "Duduwa Rural Municipality", "Janaki Rural Municipality"]
          },
          {
            name: "Bardiya",
            municipalities: ["Gulariya Municipality", "Rajapur Municipality", "Madhuwan Municipality", "Thakurbaba Municipality", "Bansgadi Municipality", "Barbardiya Municipality", "Geruwa Rural Municipality", "Badhaiyatal Rural Municipality"]
          },
          {
            name: "Dang",
            municipalities: ["Ghorahi Sub-Metropolitan City", "Tulsipur Sub-Metropolitan City", "Lamahi Municipality", "Rapti Rural Municipality", "Gadhawa Rural Municipality", "Rajpur Rural Municipality", "Shantinagar Rural Municipality", "Babai Rural Municipality", "Dangisharan Rural Municipality", "Bangalachuli Rural Municipality"]
          },
          {
            name: "Palpa",
            municipalities: ["Tansen Municipality", "Rampur Municipality", "Rainadevi Chhahara Rural Municipality", "Ribdikot Rural Municipality", "Bagnaskali Rural Municipality", "Tinau Rural Municipality", "Nisdi Rural Municipality", "Purakhola Rural Municipality", "Mathagadhi Rural Municipality", "Rambha Rural Municipality"]
          },
          {
            name: "Arghakhanchi",
            municipalities: ["Sandhikharka Municipality", "Sitganga Municipality", "Bhumikasthan Municipality", "Chhatradev Rural Municipality", "Panini Rural Municipality", "Malarani Rural Municipality"]
          },
          {
            name: "Gulmi",
            municipalities: ["Resunga Municipality", "Musikot Municipality", "Isma Rural Municipality", "Kaligandaki Rural Municipality", "Gulmidarbar Rural Municipality", "Satyawati Rural Municipality", "Chandrakot Rural Municipality", "Rurukshettra Rural Municipality", "Chhatrakot Rural Municipality", "Dhurkot Rural Municipality", "Madane Rural Municipality", "Malika Rural Municipality"]
          },
          {
            name: "Pyuthan",
            municipalities: ["Pyuthan Municipality", "Swargadwari Municipality", "Gaumukhi Rural Municipality", "Mandavi Rural Municipality", "Sarumarani Rural Municipality", "Mallarani Rural Municipality", "Nauvini Rural Municipality", "Airawati Rural Municipality", "Jhimruk Rural Municipality"]
          },
          {
            name: "Rolpa",
            municipalities: ["Rolpa Municipality", "Triveni Rural Municipality", "Duikhol Rural Municipality", "Madi Rural Municipality", "Runtigadhi Rural Municipality", "Sunchhari Rural Municipality", "Lungri Rural Municipality", "Subarnavati Rural Municipality", "Thabang Rural Municipality", "Sukidaha Rural Municipality"]
          },
          {
            name: "Nawalparasi West",
            municipalities: ["Ramgram Municipality", "Sunwal Municipality", "Bardaghat Municipality", "Susta Rural Municipality", "Palhinandan Rural Municipality", "Pratappur Rural Municipality", "Sarawal Rural Municipality"]
          },
          {
            name: "Rukum East",
            municipalities: ["Bhume Rural Municipality", "Putha Uttarganga Rural Municipality", "Sisne Rural Municipality"]
          }
        ]
      },
      {
        id: "Karnali Province",
        name: "Karnali Province",
        districts: [
          {
            name: "Surkhet",
            municipalities: ["Birendranagar Municipality", "Gurbhakot Municipality", "Panchapuri Municipality", "Bheriganga Municipality", "Lekhbeshi Municipality", "Chaukune Rural Municipality", "Barahatal Rural Municipality", "Simta Rural Municipality", "Chingad Rural Municipality"]
          },
          {
            name: "Jumla",
            municipalities: ["Chandannath Municipality", "Kanakasundari Rural Municipality", "Sinja Rural Municipality", "Hima Rural Municipality", "Tila Rural Municipality", "Guthichaur Rural Municipality", "Tatopani Rural Municipality", "Patarasi Rural Municipality"]
          },
          {
            name: "Dailekh",
            municipalities: ["Narayan Municipality", "Dullu Municipality", "Chamunda Bindrasaini Municipality", "Aathbis Municipality", "Bhagawatimai Rural Municipality", "Gurans Rural Municipality", "Dunshwar Rural Municipality", "Mahabu Rural Municipality", "Naumule Rural Municipality", "Bhairabi Rural Municipality", "Thantikandh Rural Municipality"]
          },
          {
            name: "Jajarkot",
            municipalities: ["Bheri Municipality", "Chhedagad Municipality", "Nalgad Municipality", "Barekot Rural Municipality", "Kushe Rural Municipality", "Junichande Rural Municipality", "Shivalaya Rural Municipality"]
          },
          {
            name: "Salyan",
            municipalities: ["Sharada Municipality", "Bagchaur Municipality", "Bangad Kupinde Municipality", "Kumakh Rural Municipality", "Kalimati Rural Municipality", "Chhatreshwari Rural Municipality", "Dhorchaur Rural Municipality", "Kapurkot Rural Municipality", "Triveni Rural Municipality", "Darma Rural Municipality"]
          },
          {
            name: "Rukum West",
            municipalities: ["Musikot Municipality", "Chaurjahari Municipality", "Aathbiskot Municipality", "Banfikot Rural Municipality", "Sanibheri Rural Municipality", "Triveni Rural Municipality"]
          },
          {
            name: "Kalikot",
            municipalities: ["Manma Municipality", "Khandachakra Municipality", "Raska Municipality", "Tilagufa Municipality", "Pachaljharana Rural Municipality", "Sanni Triveni Rural Municipality", "Naraharinath Rural Municipality", "Subha Kalika Rural Municipality", "Mahawai Rural Municipality"]
          },
          {
            name: "Mugu",
            municipalities: ["Chhayanath Rara Municipality", "Mugum Karmarong Rural Municipality", "Soru Rural Municipality", "Khatyad Rural Municipality"]
          },
          {
            name: "Humla",
            municipalities: ["Simikot Rural Municipality", "Namkha Rural Municipality", "Kharpunath Rural Municipality", "Sarkegad Rural Municipality", "Chankheli Rural Municipality", "Adanchuli Rural Municipality", "Tajakot Rural Municipality"]
          },
          {
            name: "Dolpa",
            municipalities: ["Thuli Bheri Municipality", "Tripurasundari Municipality", "Dolpobuddha Rural Municipality", "Shey Phoksundo Rural Municipality", "Jagadulla Rural Municipality", "Mudkechula Rural Municipality", "Kaike Rural Municipality", "Chharka Tangsong Rural Municipality"]
          }
        ]
      },
      {
        id: "Sudurpashchim Province",
        name: "Sudurpashchim Province",
        districts: [
          {
            name: "Kailali",
            municipalities: ["Dhangadhi Sub-Metropolitan City", "Tikapur Municipality", "Ghodaghodi Municipality", "Lamki Chuha Municipality", "Bhajani Municipality", "Godawari Municipality", "Gauriganga Municipality", "Janaki Rural Municipality", "Bardgoriya Rural Municipality", "Mohanyal Rural Municipality", "Chailari Rural Municipality", "Kailari Rural Municipality", "Chure Rural Municipality"]
          },
          {
            name: "Kanchanpur",
            municipalities: ["Bhimdatta Municipality", "Bedkot Municipality", "Belauri Municipality", "Beldandi Rural Municipality", "Krishnapur Municipality", "Mahakali Municipality", "Punarbas Municipality", "Shuklaphanta Municipality", "Laljhadi Rural Municipality"]
          },
          {
            name: "Doti",
            municipalities: ["Dipayal Silgadhi Municipality", "Shikhar Municipality", "Purbichowki Rural Municipality", "Aadarsha Rural Municipality", "Kedarshayala Rural Municipality", "Bogtan Rural Municipality", "Badikedar Rural Municipality", "Sayal Rural Municipality", "Jorayal Rural Municipality"]
          },
          {
            name: "Achham",
            municipalities: ["Mangalsen Municipality", "Sanfebagar Municipality", "Kamalbazar Municipality", "Panchadewal Binayak Municipality", "Bannigadi Jayagadh Rural Municipality", "Chaurpati Rural Municipality", "Dhakari Rural Municipality", "Mellekh Rural Municipality", "Ramamaros Rural Municipality", "Turmakhand Rural Municipality"]
          },
          {
            name: "Bajhang",
            municipalities: ["Jayaprithvi Municipality", "Khaptadchhanna Rural Municipality", "Thalara Rural Municipality", "Talkot Rural Municipality", "Masta Rural Municipality", "Bungal Municipality", "Surma Rural Municipality", "Chhabis Pathibhera Rural Municipality", "Durgathali Rural Municipality", "Kedarsye Rural Municipality", "Kanda Rural Municipality"]
          },
          {
            name: "Bajura",
            municipalities: ["Badimalika Municipality", "Triveni Municipality", "Budhiganga Municipality", "Kolti Municipality", "Himali Rural Municipality", "Jagannath Rural Municipality", "Swamikartik Rural Municipality", "Gaumul Rural Municipality", "Khaptad Chhededaha Rural Municipality"]
          },
          {
            name: "Dadeldhura",
            municipalities: ["Amargadhi Municipality", "Parashuram Municipality", "Navadurga Rural Municipality", "Aalital Rural Municipality", "Bhageshwar Rural Municipality", "Ganayapdhura Rural Municipality", "Ajayameru Rural Municipality"]
          },
          {
            name: "Baitadi",
            municipalities: ["Dasharathchand Municipality", "Patan Municipality", "Melauli Municipality", "Puranchaur Municipality", "Dogadakedar Rural Municipality", "Dilasaini Rural Municipality", "Pancheshwar Rural Municipality", "Shivanath Rural Municipality", "Sigas Rural Municipality", "Surnaya Rural Municipality"]
          },
          {
            name: "Darchula",
            municipalities: ["Mahakali Municipality", "Shailashikar Municipality", "Malikarjun Rural Municipality", "Apihimal Rural Municipality", "Duhun Rural Municipality", "Naugad Rural Municipality", "Marma Rural Municipality", "Lekam Rural Municipality", "Vyans Rural Municipality"]
          }
        ]
      }
    ]
  };

  return NextResponse.json(locationData);
}