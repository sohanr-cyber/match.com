const dict = {
  // Gender
  Male: 'পুরুষ',
  Female: 'মহিলা',
  // Family Status
  'Lower Class': 'নিম্ন শ্রেণী',
  'Lower Middle Class': 'নিম্ন মধ্যবর্তী শ্রেণী',
  'Middle Class': 'মধ্যবর্তী শ্রেণী',
  'Higher Class': 'উচ্চ শ্রেণী',
  'Higher Middle Class': 'উচ্চ মধ্যবর্তী শ্রেণী',
  // skin Colors
  'Skin Color': 'গায়ের রঙ',
  'Very Fair': 'উজ্জ্বল ফর্সা',
  Fair: 'ফর্সা',
  // Medium: '',
  'Light Brown': 'উজ্জ্বল শ্যামলা',
  Brown: 'শ্যামলা',
  Black: 'কালো',

  // Marital Status
  'Never Married': 'অবিবাহিত',
  Divorced: 'তালাকপ্রাপ্ত',
  Married: 'বিবাহিত',
  Widowed: 'বিধবা',

  // Category
  'Not an Issue with Marrying a Student/Job Seeker':
    'শিক্ষার্থী  অথবা জব খুঁজতেছে এমন কাউকে বিয়ে করতে আগ্রহী  ',
  'Not an Issue with Marrying a Student/Job Seeker Having Halal Incom':
    'শিক্ষার্থী  অথবা জব খুঁজতেছে এবং ইনকাম আছে এমন কাউকে বিয়ে করতে আগ্রহী',
  'Interested in Marrying a Divorced': 'তালাকপ্রাপ্ত বিয়ে করতে আগ্রহী',
  'Interested in Marrying a Divorced Having Children ':
    'সন্তান + তালাকপ্রাপ্ত বিয়ে করতে আগ্রহী',
  'Nulliparous Females': 'বন্ধ্যা',
  'Autism Spectrum': 'প্রতিবন্ধী',
  'Orphan Status': 'এতিম',
  'Interested in Polygyny (Being/Want a Second Wife)':
    'মাসনা হতে/করতে আগ্রহী  ',
  'New Muslim': 'নওমুসলিম',
  Emigrant: 'প্রবাসী',
  'Interested In Emigrant': 'প্রবাসী বিয়ে করতে আগ্রহী',
  // others
  feet: 'ফুট',
  inches: 'ইঞ্চি',
  // Education Types

  General: 'জেনারেল',
  Koumi: 'কওমী',
  Alia: 'আলিয়া',

  // Profession
  Accounting: 'হিসাবরক্ষণ',
  Architect: 'স্থপতি',
  'Army Officer': 'সেনা কর্মকর্তা',
  BA: 'ব্যাচেলর অব আর্টস',
  'BSC Cadre': 'বিএসসি ক্যাডার',
  BSC: 'বিএসসি',
  Banker: 'ব্যাংকার',
  Barrister: 'ব্যারিস্টার',
  Business: 'ব্যবসা',
  'Buying House Job': 'কেনাকাটা হাউজ চাকরি',
  'Chartered Accountant': 'চার্টার্ড অ্যাকাউন্ট্যান্ট',
  'Computer Professional': 'কম্পিউটার পেশাদার',
  Consultant: 'পরামর্শক',
  'Customer Call Center': 'গ্রাহক কল সেন্টার',
  'Defense Officer': 'প্রতিরক্ষা কর্মকর্তা',
  Dentist: 'দাঁতের চিকিৎসক',
  Designer: 'ডিজাইনার',
  Doctor: 'ডাক্তার',
  Engineer: 'প্রকৌশলী',
  Fazel: 'ফযিল',
  Freelancer: 'ফ্রিল্যান্সার',
  'Govt. Service Holder': 'সরকারি সেবার ধারক',
  Hafiz: 'হাফিজ',
  Homemaker: 'গৃহিণী',
  Industrialist: 'শিল্পপতি',
  Journalist: 'সাংবাদিক',
  Lawyer: 'আইনজীবী',
  Lecture: 'লেকচার',
  MA: 'মাস্টার অব আর্টস',
  MSC: 'মাস্টার অব সাইন্স',
  'Marine Engineer': 'মেরিন ইঞ্জিনিয়ার',
  'Media Person': 'মিডিয়া ব্যক্তি',
  'Navy Officer': 'নেভি অফিসার',
  'News Presenter': 'নিউজ প্রেজেন্টার',
  Nurse: 'ওষুধ নির্মাতা',
  Owner: 'মালিক',
  Pharmacist: 'ফার্মেসিস্ট',
  Phtographer: 'ছবি তোলা',
  'Police Officer': 'পুলিশ অফিসার',
  'Private Service Holder': 'বেসরকারি সেবার ধারক',
  Professor: 'অধ্যাপক',
  'Religious Institution': 'ধর্মীয় প্রতিষ্ঠান',
  Sailor: 'নাবিক',
  'Self Employed': 'স্ব-কর্মসংস্থানী',
  Sports: 'খেলাধুলা',
  Student: 'ছাত্র',
  Supermarkets: 'সুপারমার্কেট',
  Teacher: 'শিক্ষক',
  Telecomunication: 'টেলিকমিউনিকেশন',
  Unemployed: 'বেকার',
  Write: 'লেখা',
  Other: 'অন্যান্য',

  // Education
  Associates: 'এসোসিয়েট',
  'B Pharm': 'বি ফার্ম',
  'B.Com': 'বি.কম',
  BBA: 'বি.বি.এ',
  BSC: 'বি.এস.সি',
  Bachelors: 'ব্যাচেলর্স',
  CA: 'সিএ',
  Dakhil: 'দাখিল',
  'Did not complete Hight School': 'উচ্চ বিদ্যালয় সমাপ্ত করেনি',
  Diploma: 'ডিপ্লোমা',
  Doctorate: 'ডক্টরেট',
  Fazil: 'ফাযিল',
  HSC: 'এইচ.এস.সি',
  'Hight School': 'উচ্চ বিদ্যালয়',
  Kamil: 'কামিল',
  LLB: 'এলএলবি',
  LLM: 'এলএলএম',
  'M Pharm': 'এম ফার্ম',
  'M.Com': 'এম.কম',
  MBA: 'এমবিএ',
  MBBS: 'এমবিবিএস',
  MPhil: 'এমফিল',
  MSC: 'এম.এস.সি',
  Masters: 'মাস্টার্স',
  SSC: 'এস.এস.সি',
  'Some College': 'কিছু কলেজ',

  // dummy data
  Age: 'বয়স',
  Height: 'উচ্চতা',
  Color: 'রঙ',
  Profession: 'পেশা',
  Body: 'শরীর',
  Gender: 'লিঙ্গ',
  City: 'বিভাগ',
  District: 'জেলা',
  Upazilla: 'উপজেলা',
  'Marital Status': 'বৈবাহিক অবস্থা',
  'Education Type': 'শিক্ষার ধরণ',
  'College/Universtiy': 'কলেজ/বিশ্ববিদ্যালয়',
  Category: 'ধরন',
  Education: 'শিক্ষা',
  'Body Type': 'শরীরের ধরন',
  Division: 'বিভাগ',
  All: 'সকল',
  Search: 'খুঁজুন',
  Apply: 'খুঁজুন',
  year: 'বছর',
  Maximum: 'সর্বোচ্চ',
  Minimum: 'সর্বনিম্ন',
  To: 'সর্বোচ্চ',
  From: 'সর্বনিম্ন',
  'I am Looking for': 'আমি খুজছি',
  'Search Profile By Id': "'আইডি দ্বারা প্রোফাইল অনুসন্ধান করুন'",

  // Divisioin
  'Not Selected': 'নির্বাচিত না',
  Barishal: 'বরিশাল',
  Chattogram: 'চট্টগ্রাম',
  Dhaka: 'ঢাকা',
  Khulna: 'খুলনা',
  Mymensingh: 'ময়মনসিংহ',
  Rajshahi: 'রাজশাহী',
  Rangpur: 'রংপুর',
  Sylhet: 'সিলেট',
  // District and Upazilla
  Barguna: 'বরগুনা',
  Taltali: 'তালতলি',
  Bamna: 'বামনা',
  Patharghata: 'পাথরঘাটা',
  'Barguna Sadar': 'বরগুনা সদর',
  Amtali: 'আমতলী',
  Betagi: 'বেতাগী',
  Barishal: 'বরিশাল',
  Hizla: 'হিজলা',
  Bakerganj: 'বাকেরগঞ্জ',
  Banaripara: 'বানারিপাড়া',
  Muladi: 'মুলাদি',
  Wazirpur: 'ওয়াজিরপুর',
  Agailjhara: 'আগাইলঝাড়া',
  Babuganj: 'বাবুগঞ্জ',
  Barisal: 'বরিশাল',
  'Barisal Sadar': 'বরিশাল সদর',
  Bhola: 'ভোলা',
  Lalmohan: 'লালমোহন',
  Manpura: 'মানপুরা',
  'Bhola Sadar': 'ভোলা সদর',
  Tazumuddin: 'তাজুমদ্দিন',
  Burhanuddin: 'বুরহানউদ্দিন',
  'Char Fasson': 'চরফ্যাশন',
  Daulatkhan: 'দৌলতখান',
  Jhalokati: 'ঝালকাঠি',
  Rajapur: 'রাজাপুর',
  Nalchhiti: 'নলছিটি',
  Kathalia: 'কাথালিয়া',
  'Jhalokati Sadar': 'ঝালকাঠি সদর',
  Patuakhali: 'পটুয়াখালী',
  'Patuakhali Sadar': 'পটুয়াখালী সদর',
  Mirzaganj: 'মির্জাগঞ্জ',
  Dashmina: 'দশমিনা',
  Bauphal: 'বাউফল',
  Rangabali: 'রাঙ্গাবালি',
  Kalapara: 'কলাপাড়া',
  Dumki: 'ডুমকি',
  Galachipa: 'গলাচিপা',
  Pirojpur: 'পিরোজপুর',
  Kawkhali: 'কাউখালী',
  Nazirpur: 'নাজিরপুর',
  Mathbaria: 'মঠবাড়িয়া',
  'Pirojpur Sadar': 'পিরোজপুর সদর',
  Bhandaria: 'ভান্ডারিয়া',
  'Nesarabad (Swarupkati)': 'নেছারাবাদ (স্বরূপকাঠি)',
  Indurkani: 'ইন্দুরকানী',
  Bandarban: 'বান্দরবান',
  Naikhongchhari: 'নাইখংছড়ি',
  'Bandarban Sadar': 'বান্দরবান সদর',
  Thanchi: 'থানচি',
  Rowangchhari: 'রওয়াংছড়ি',
  'Ali Kadam': 'আলী কদম',
  Lama: 'লামা',
  Ruma: 'রুমা',
  Brahmanbaria: 'ব্রাহ্মণবাড়িয়া',
  Nabinagar: 'নবীনগর',
  Nasirnagar: 'নাসিরনগর',
  Sarail: 'সরাইল',
  'Brahmanbaria Sadar': 'ব্রাহ্মণবাড়িয়া সদর',
  Ashuganj: 'আশুগঞ্জ',
  Bijoynagar: 'বিজয়নগর',
  Bancharampur: 'বাঞ্ছারামপুর',
  Kasba: 'কসবা',
  Akhaura: 'আখাউরা',
  Chandpur: 'চাঁদপুর',
  Kachua: 'কচুয়া',
  'Chandpur Sadar': 'চাঁদপুর সদর',
  Shahrasti: 'শাহরাস্তি',
  Haziganj: 'হাজীগঞ্জ',
  'Matlab Dakshin': 'মতলব দক্ষিণ',
  Faridganj: 'ফরিদগঞ্জ',
  Haimchar: 'হাইমচর',
  'Matlab Uttar': 'মতলব উত্তর',
  Chattogram: 'চট্টগ্রাম',
  Patiya: 'পটিয়া',
  Rangunia: 'রাঙ্গুনিয়া',
  Anwara: 'আনোয়ারা',
  Boalkhali: 'বোয়ালখালী',
  Raozan: 'রাউজান',
  Hathazari: 'হাটহাজারী',
  Banshkhali: 'বাঁশখালী',
  Mirsharai: 'মীরশরাই',
  Satkania: 'সাতকানিয়া',
  Sitakunda: 'সীতাকুন্ড',
  Karnaphuli: 'কর্ণফুলী',
  Sandwip: 'সন্দ্বীপ',
  Chandanaish: 'চন্দনাইশ',
  Fatikchhari: 'ফটিকছড়ি',
  Lohagara: 'লোহাগাড়া',
  "Cox's Bazar": 'কক্সবাজার',
  Chakaria: 'চকরিয়া',
  Ramu: 'রামু',
  Kutubdia: 'কুতুবদিয়া',
  Pekua: 'পেকুয়া',
  Teknaf: 'টেকনাফ',
  Maheshkhali: 'মহেশখালী',
  "Cox's Bazar Sadar": 'কক্সবাজার সদর',
  Ukhia: 'উখিয়া',
  Cumilla: 'কুমিল্লা',
  Meghna: 'মেঘনা',
  Chauddagram: 'চৌদ্দগ্রাম',
  'Cumilla Adarsha Sadar': 'কুমিল্লা আদর্শ সদর',
  Brahmanpara: 'ব্রাহ্মণপাড়া',
  Burichang: 'বুড়িচং',
  Lalmai: 'লালমাই',
  Nangalkot: 'নাঙ্গলকোট',
  'Cumilla Sadar Dakshin': 'কুমিল্লা সদর দক্ষিণ',
  Laksam: 'লাকসাম',
  Monohargonj: 'মনোহরগঞ্জ',
  Daudkandi: 'দাউদকান্দি',
  Chandina: 'চান্দিনা',
  Barura: 'বরুড়া',
  Homna: 'হোমনা',
  Muradnagar: 'মুরাদনগর',
  Titas: 'তিতাস',
  Debidwar: 'দেবিদ্বার',
  Feni: 'ফেনী',
  Chhagalnaiya: 'ছাগলনাইয়া',
  Sonagazi: 'সোনাগাজী',
  Daganbhuiyan: 'দাগনভূইয়া',
  Fulgazi: 'ফুলগাজী',
  Parshuram: 'পরশুরাম',
  'Feni Sadar': 'ফেনী সদর',
  Khagrachari: 'খাগড়াছড়ি',
  Dighinala: 'দিঘিনালা',
  Manikchhari: 'মানিকছড়ি',
  Panchhari: 'পানছড়ি',
  Matiranga: 'মাটিরাঙ্গা',
  Lakshmichhari: 'লক্ষ্মীছড়ি',
  Mahalchhari: 'মহলছড়ি',
  Ramgarh: 'রামগড়',
  'Khagrachhari Sadar': 'খাগড়াছড়ি সদর',
  Lakshmipur: 'লক্ষ্মীপুর',
  'Lakshmipur Sadar': 'লক্ষ্মীপুর সদর',
  Kamalnagar: 'কমলনগর',
  Ramganj: 'রামগঞ্জ',
  Ramgati: 'রামগতি',
  Raipur: 'রায়পুর',
  Noakhali: 'নোয়াখালী',
  Begumganj: 'বেগমগঞ্জ',
  Companiganj: 'কোম্পানীগঞ্জ',
  Hatiya: 'হাটিয়া',
  Subarnachar: 'সুবর্ণচর',
  'Noakhali Sadar': 'নোয়াখালী সদর',
  Kabirhat: 'কবিরহাট',
  Senbagh: 'সেনবাগ',
  Sonaimuri: 'সোনাইমুড়ী',
  Chatkhil: 'চাটখিল',
  Rangamati: 'রাঙ্গামাটি',
  Kaptai: 'কাপ্তাই',
  Barkal: 'বরকল',
  Langadu: 'লংগদু',
  Rajasthali: 'রাজাস্থালী',
  Belaichhari: 'বেলাইছড়ি',
  Naniyachar: 'নানিয়াচর',
  Kawkhali: 'কাউখালী',
  'Rangamati Sadar': 'রাঙ্গামাটি সদর',
  Juraichhari: 'জুরাইছড়ি',
  Bagaichhari: 'বাঘাইছড়ি',
  Dhaka: 'ঢাকা',
  Dohar: 'দোহার',
  Savar: 'সাভার',
  Nawabganj: 'নবাবগঞ্জ',
  Dhamrai: 'ধামরাই',
  Keraniganj: 'কেরাণীগঞ্জ',
  Faridpur: 'ফরিদপুর',
  Boalmari: 'বোয়ালমারী',
  'Faridpur Sadar': 'ফরিদপুর সদর',
  Alfadanga: 'আলফাডাঙ্গা',
  Charbhadrasan: 'চরভদ্রাসন',
  Madhukhali: 'মধুখালী',
  Saltha: 'সালথা',
  Sadarpur: 'সদরপুর',
  Nagarkanda: 'নগরকান্দা',
  Bhanga: 'ভাঙ্গা',
  Gazipur: 'গাজীপুর',
  Kapasia: 'কাপাসিয়া',
  Kaliganj: 'কালীগঞ্জ',
  Kaliakair: 'কালিয়াকৈর',
  Sreepur: 'শ্রীপুর',
  'Gazipur Sadar': 'গাজীপুর সদর',
  Gopalganj: 'গোপালগঞ্জ',
  Tungipara: 'টুঙ্গীপাড়া',
  Kashiani: 'কাশিয়ানী',
  Muksudpur: 'মুকসুদপুর',
  Kotalipara: 'কোটালিপাড়া',
  'Gopalganj Sadar': 'গোপালগঞ্জ সদর',
  Kishoreganj: 'কিশোরগঞ্জ',
  'Kishoreganj Sadar': 'কিশোরগঞ্জ সদর',
  Itna: 'ইটনা',
  Austagram: 'আউস্তাগ্রাম',
  Pakundia: 'পাকুন্দিয়া',
  Hossainpur: 'হোসেনপুর',
  Tarail: 'তারাইল',
  Bhairab: 'ভৈরব',
  Mithamain: 'মিঠামাইন',
  Bajitpur: 'বাজিতপুর',
  Kuliarchar: 'কুলিয়ারচর',
  Katiadi: 'কটিয়াদি',
  Nikli: 'নিকলি',
  Karimganj: 'করিমগঞ্জ',
  Madaripur: 'মাদারীপুর',
  Shibchar: 'শিবচর',
  'Madaripur Sadar': 'মাদারীপুর সদর',
  Kalkini: 'কালকিনি',
  Rajoir: 'রাজৈর',
  Manikganj: 'মানিকগঞ্জ',
  'Manikgonj Sadar': 'মানিকগঞ্জ সদর',
  Shivalaya: 'শিবালয়',
  Ghior: 'ঘিওর',
  Harirampur: 'হরিরামপুর',
  Singair: 'সিঙ্গাইর',
  Daulatpur: 'দৌলতপুর',
  Saturia: 'সাটুরিয়া',
  Munshiganj: 'মুন্সিগঞ্জ',
  Sreenagar: 'শ্রীনগর',
  Gazaria: 'গজারিয়া',
  Tongibari: 'টঙ্গিবাড়ি',
  Sirajdikhan: 'সিরাজদিখান',
  'Munshiganj Sadar': 'মুন্সিগঞ্জ সদর',
  Lohajang: 'লোহাজং',
  Narayanganj: 'নারায়ণগঞ্জ',
  Rupganj: 'রূপগঞ্জ',
  Bandar: 'বান্দার',
  Sonargaon: 'সোনারগাঁও',
  Araihazar: 'আড়াইহাজার',
  'Narayanganj Sadar': 'নারায়ণগঞ্জ সদর',
  Narsingdi: 'নরসিংদী',
  Palash: 'পলাশ',
  Belabo: 'বেলাব',
  'Narsingdi Sadar': 'নরসিংদী সদর',
  Raipura: 'রায়পুরা',
  Monohardi: 'মনোহরদি',
  Shibpur: 'শিবপুর',
  Rajbari: 'রাজবাড়ি',
  Baliakandi: 'বালিয়াকান্দি',
  'Rajbari Sadar': 'রাজবাড়ি সদর',
  Goalandaghat: 'গোয়ালন্দঘাট',
  Pangsha: 'পাংশা',
  Kalukhali: 'কালুখালি',
  Shariatpur: 'শরীয়তপুর',
  Damudya: 'দামুদিয়া',
  Gosairhat: 'গোসাইরহাট',
  'Shariatpur Sadar': 'শরীয়তপুর সদর',
  Zajira: 'জাজিরা',
  Naria: 'নড়িয়া',
  Bhedarganj: 'ভেদরগঞ্জ',
  Tangail: 'টাঙ্গাইল',
  Kalihati: 'কালিহাতী',
  Nagarpur: 'নগরপুর',
  'Tangail Sadar': 'টাঙ্গাইল সদর',
  Sakhipur: 'সখিপুর',
  Bhuapur: 'ভুয়াপুর',
  Madhupur: 'মধুপুর',
  Gopalpur: 'গোপালপুর',
  Mirzapur: 'মির্জাপুর',
  Delduar: 'দেলদুয়ার',
  Dhanbari: 'ধনবাড়ী',
  Ghatail: 'ঘাটাইল',
  Basail: 'বসাইল',
  Bagerhat: 'বাগেরহাট',
  Sarankhola: 'সারানখোলা',
  'Bagerhat Sadar': 'বাগেরহাট সদর',
  Chitalmari: 'চিতলমারী',
  Fakirhat: 'ফকিরহাট',
  Morrelganj: 'মরেলগঞ্জ',
  Mongla: 'মোংলা',
  Rampal: 'রামপাল',
  Mollahat: 'মোল্লাহাট',
  Kachua: 'কচুয়া',
  Chuadanga: 'চুয়াডাঙ্গা',
  Damurhuda: 'দামুরহুদা',
  'Chuadanga Sadar': 'চুয়াডাঙ্গা সদর',
  Alamdanga: 'আলমডাঙ্গা',
  Jibannagar: 'জীবননগর',
  Jashore: 'যশোর',
  Manirampur: 'মণিরামপুর',
  Sharsha: 'শার্শা',
  Jhikargachha: 'ঝিকরগাছা',
  'Jashore Sadar': 'যশোর সদর',
  Bagherpara: 'বাঘেরপাড়া',
  Chaugachha: 'চৌগাছা',
  Keshabpur: 'কেশবপুর',
  Abhaynagar: 'অভয়নগর',
  Jhenaidah: 'ঝিনাইদহ',
  Kaliganj: 'কালীগঞ্জ',
  Harinakunda: 'হরিণাকুন্ডা',
  Kotchandpur: 'কোটচাঁদপুর',
  Maheshpur: 'মহেশপুর',
  'Jhenaidah Sadar': 'ঝিনাইদহ সদর',
  Shailkupa: 'শৈলকুপা',
  Khulna: 'খুলনা',
  Batiaghata: 'বাটিয়াঘাটা',
  Koyra: 'কয়রা',
  Phultala: 'ফুলতলা',
  Dumuria: 'ডুমুরিয়া',
  Dighalia: 'দিঘলিয়া',
  Paikgachha: 'পাইকগাছা',
  Rupsha: 'রূপসা',
  Terokhada: 'তেরোখাদা',
  Dacope: 'ডাকপ',
  Kushtia: 'কুষ্টিয়া',
  Daulatpur: 'দৌলতপুর',
  Kumarkhali: 'কুমারখালি',
  Mirpur: 'মিরপুর',
  Khoksa: 'খোকসা',
  Bheramara: 'ভেড়ামারা',
  'Kushtia Sadar': 'কুষ্টিয়া সদর',
  Magura: 'মাগুরা',
  Shalikha: 'শালিখা',
  Sreepur: 'শ্রীপুর',
  Mohammadpur: 'মহম্মদপুর',
  'Magura Sadar': 'মাগুরা সদর',
  Meherpur: 'মেহেরপুর',
  Mujibnagar: 'মুজিবনগর',
  'Meherpur Sadar': 'মেহেরপুর সদর',
  Gangni: 'গাংনী',
  Narail: 'নড়াইল',
  Lohagara: 'লোহাগড়া',
  Kalia: 'কালিয়া',
  'Narail Sadar': 'নড়াইল সদর',
  Satkhira: 'সাতক্ষীরা',
  Shyamnagar: 'শ্যামনগর',
  Tala: 'তালা',
  'Satkhira Sadar': 'সাতক্ষীরা সদর',
  Assasuni: 'আসসাসুনি',
  Kaliganj: 'কালিগঞ্জ',
  Kalaroa: 'কলারোয়া',
  Debhata: 'দেবহাটা',
  Jamalpur: 'জামালপুর',
  Baksiganj: 'বকশীগঞ্জ',
  Melandaha: 'মেলানদাহা',
  'Jamalpur Sadar': 'জামালপুর সদর',
  Dewanganj: 'দেওয়ানগঞ্জ',
  Sarishabari: 'সরিষাবাড়ী',
  Islampur: 'ইসলামপুর',
  Madarganj: 'মাদারগঞ্জ',
  Mymensingh: 'ময়মনসিংহ',
  Muktagachha: 'মুক্তাগাছা',
  Haluaghat: 'হালুয়াঘাট',
  'Tara Khanda': 'তারা খান্দা',
  Dhobaura: 'ধোবাউড়া',
  Fulbaria: 'ফুলবাড়িয়া',
  Nandail: 'নান্দাইল',
  Gauripur: 'গৌরিপুর',
  Bhaluka: 'ভালুকা',
  Trishal: 'ত্রিশাল',
  Ishwarganj: 'ঈশ্বরগঞ্জ',
  'Mymensingh Sadar': 'ময়মনসিংহ সদর',
  Phulpur: 'ফুলপুর',
  Gafargaon: 'গফরগাঁও',
  Netrokona: 'নেত্রকোণা',
  Purbadhala: 'পূর্বধলা',
  Mohanganj: 'মোহনগঞ্জ',
  Barhatta: 'বরহাট্টা',
  Durgapur: 'দুর্গাপুর',
  Madan: 'মদন',
  'Netrokona Sadar': 'নেত্রকোণা সদর',
  Khaliajuri: 'খালিয়াজুরি',
  Kalmakanda: 'কলমাকান্দা',
  Kendua: 'কেন্দুয়া',
  Atpara: 'আটপাড়া',
  Sherpur: 'শেরপুর',
  Nalitabari: 'নালিতাবাড়ী',
  Jhenaigati: 'ঝিনাইগাতি',
  Sreebardi: 'শ্রীবরদী',
  Nakla: 'নাকলা',
  'Sherpur Sadar': 'শেরপুর সদর',
  Bogura: 'বগুড়া',
  Sherpur: 'শেরপুর',
  Dhunat: 'ধুনট',
  Nandigram: 'নন্দিগ্রাম',
  Adamdighi: 'আদমদিঘী',
  Shibganj: 'শিবগঞ্জ',
  Sariakandi: 'সারিয়াকান্দি',
  'Bogura Sadar': 'বগুড়া সদর',
  Gabtali: 'গাবতলী',
  Shajahanpur: 'শাজাহানপুর',
  Kahaloo: 'কাহালু',
  Sonatola: 'সোনাটোলা',
  Dhupchanchia: 'ধুপচাঁচিয়া',
  'Chapai Nawabganj': 'চাঁপাই নবাবগঞ্জ',
  Nachole: 'নাচোল',
  Gomastapur: 'গোমস্তাপুর',
  Shibganj: 'শিবগঞ্জ',
  Bholahat: 'ভোলাহাট',
  'Chapai Nawabganj Sadar': 'চাঁপাই নবাবগঞ্জ সদর',
  Joypurhat: 'জয়পুরহাট',
  'Joypurhat Sadar': 'জয়পুরহাট সদর',
  Akkelpur: 'আক্কেলপুর',
  Panchbibi: 'পাঁচবিবি',
  Kalai: 'কালাই',
  Khetlal: 'খেতলাল',
  Naogaon: 'নওগাঁ',
  'Naogaon Sadar': 'নওগাঁ সদর',
  Porsha: 'পোরশা',
  Manda: 'মান্দা',
  Patnitala: 'পত্নিতলা',
  Atrai: 'আত্রাই',
  Badalgachhi: 'বদলগাছী',
  Mohadevpur: 'মহাদেবপুর',
  Dhamoirhat: 'ধামইরহাট',
  Niamatpur: 'নিয়ামতপুর',
  Sapahar: 'সাপাহার',
  Raninagar: 'রাণীনগর',
  Natore: 'নাটোর',
  Bagatipara: 'বাগাতিপাড়া',
  'Natore Sadar': 'নাটোর সদর',
  Lalpur: 'লালপুর',
  Singra: 'সিংড়া',
  Gurudaspur: 'গুরুদাসপুর',
  Naldanga: 'নলডাঙ্গা',
  Baraigram: 'বড়াইগ্রাম',
  Pabna: 'পাবনা',
  Ishwardi: 'ঈশ্বরদী',
  Atgharia: 'আটঘরিয়া',
  'Pabna Sadar': 'পাবনা সদর',
  Santhia: 'সাঁনথিয়া',
  Faridpur: 'ফরিদপুর',
  Chatmohar: 'চাটমোহর',
  Bera: 'বেড়া',
  Bhangura: 'ভাঙ্গুরা',
  Sujanagar: 'সুজানগর',
  Rajshahi: 'রাজশাহী',
  Charghat: 'ছারঘাট',
  Paba: 'পবা',
  Bagmara: 'বাগমারা',
  Durgapur: 'দুর্গাপুর',
  Godagari: 'গোদাগাড়ি',
  Tanore: 'তানোর',
  Bagha: 'বাঘা',
  Puthia: 'পুঠিয়া',
  Mohanpur: 'মোহনপুর',
  Sirajganj: 'সিরাজগঞ্জ',
  Kazipur: 'কাজীপুর',
  Chauhali: 'চৌহালি',
  'Sirajganj Sadar': 'সিরাজগঞ্জ সদর',
  Tarash: 'তারাশ',
  Belkuchi: 'বেলকুচি',
  Ullahpara: 'উল্লাপাড়া',
  Shahjadpur: 'শাহজাদপুর',
  Kamarkhanda: 'কামারখান্দা',
  Rajbari: 'রাজবাড়ী',
  Baliakandi: 'বালিয়াকান্দি',
  'Rajbari Sadar': 'রাজবাড়ী সদর',
  Goalandaghat: 'গোয়ালন্দঘাট',
  Pangsha: 'পাংশা',
  Kalukhali: 'কালুখালী',
  Shariatpur: 'শরীয়তপুর',
  Damudya: 'দামুদিয়া',
  Gosairhat: 'গোসাইরহাট',
  'Shariatpur Sadar': 'শরীয়তপুর সদর',
  Zajira: 'জাজিরা',
  Naria: 'নারিয়া',
  Bhedarganj: 'ভেদরগঞ্জ',
  Tangail: 'টাঙ্গাইল',
  Kalihati: 'কালিহাতী',
  Nagarpur: 'নাগরপুর',
  'Tangail Sadar': 'টাঙ্গাইল সদর',
  Sakhipur: 'সখিপুর',
  Bhuapur: 'ভুয়াপুর',
  Madhupur: 'মধুপুর',
  Gopalpur: 'গোপালপুর',
  Mirzapur: 'মির্জাপুর',
  Delduar: 'দেলদুয়ার',
  Dhanbari: 'ধনবাড়ী',
  Ghatail: 'ঘাটাইল',
  Basail: 'বাসাইল',
  Bagerhat: 'বাগেরহাট',
  Sarankhola: 'সরণখোলা',
  'Bagerhat Sadar': 'বাগেরহাট সদর',
  Chitalmari: 'চিতলমারি',
  Fakirhat: 'ফকিরহাট',
  Morrelganj: 'মোরেলগঞ্জ',
  Mongla: 'মোংলা',
  Rampal: 'রামপাল',
  Mollahat: 'মোল্লাহাট',
  Kachua: 'কচুয়া',
  Chuadanga: 'চুয়াডাঙ্গা',
  Damurhuda: 'দামুরহুদা',
  'Chuadanga Sadar': 'চুয়াডাঙ্গা সদর',
  Alamdanga: 'আলমডাঙ্গা',
  Jibannagar: 'জীবননগর',
  Jashore: 'যশোর',
  Manirampur: 'মণিরামপুর',
  Sharsha: 'সারশা',
  Jhikargachha: 'ঝিকরগাছা',
  'Jashore Sadar': 'যশোর সদর',
  Bagherpara: 'বাঘারপাড়া',
  Chaugachha: 'চৌগাছা',
  Keshabpur: 'কেশবপুর',
  Abhaynagar: 'অভয়নগর',
  Jhenaidah: 'ঝিনাইদহ',
  Kaliganj: 'কালীগঞ্জ',
  Harinakunda: 'হরিণাকুন্ড',
  Kotchandpur: 'কোটচাঁদপুর',
  Maheshpur: 'মহেশপুর',
  'Jhenaidah Sadar': 'ঝিনাইদহ সদর',
  Shailkupa: 'শৈলকুপা',
  Khulna: 'খুলনা',
  Batiaghata: 'বাটিয়াঘাটা',
  Koyra: 'কয়রা',
  Phultala: 'ফুলতলা',
  Dumuria: 'ডুমুরিয়া',
  Dighalia: 'দিঘলিয়া',
  Paikgachha: 'পাইকগাছা',
  Rupsha: 'রূপসা',
  Terokhada: 'তেরখাদা',
  Dacope: 'ডাকোপ',
  Kushtia: 'কুষ্টিয়া',
  Daulatpur: 'দৌলতপুর',
  Kumarkhali: 'কুমারখালী',
  Mirpur: 'মিরপুর',
  Khoksa: 'খোকসা',
  Bheramara: 'ভেরামারা',
  'Kushtia Sadar': 'কুষ্টিয়া সদর',
  Magura: 'মাগুরা',
  Shalikha: 'শালিখা',
  Sreepur: 'শ্রীপুর',
  Mohammadpur: 'মোহাম্মদপুর',
  'Magura Sadar': 'মাগুরা সদর',
  Meherpur: 'মেহেরপুর',
  Mujibnagar: 'মুজিবনগর',
  'Meherpur Sadar': 'মেহেরপুর সদর',
  Gangni: 'গাংনী',
  Narail: 'নড়াইল',
  Lohagara: 'লোহাগাড়া',
  Kalia: 'কালিয়া',
  'Narail Sadar': 'নড়াইল সদর',
  Satkhira: 'সাতক্ষীরা',
  Shyamnagar: 'শ্যামনগর',
  Tala: 'তালা',
  'Satkhira Sadar': 'সাতক্ষীরা সদর',
  Assasuni: 'আসসাসুনি',
  Kaliganj: 'কালীগঞ্জ',
  Kalaroa: 'কলারোয়া',
  Debhata: 'দেবহাটা',
  Jamalpur: 'জামালপুর',
  Baksiganj: 'বকসিগঞ্জ',
  Melandaha: 'মেলানদাহা',
  'Jamalpur Sadar': 'জামালপুর সদর',
  Dewanganj: 'দেওয়ানগঞ্জ',
  Sarishabari: 'সরিষাবাড়ী',
  Islampur: 'ইসলামপুর',
  Madarganj: 'মাদারগঞ্জ',
  Mymensingh: 'ময়মনসিংহ',
  Muktagachha: 'মুক্তাগাছা',
  Haluaghat: 'হালুয়াঘাট',
  'Tara Khanda': 'তারা খান্দ',
  Dhobaura: 'ধোবাউড়া',
  Fulbaria: 'ফুলবাড়িয়া',
  Nandail: 'নান্দাইল',
  Gauripur: 'গৌরীপুর',
  Bhaluka: 'ভালুকা',
  Trishal: 'ত্রিশাল',
  Ishwarganj: 'ঈশ্বরগঞ্জ',
  'Mymensingh Sadar': 'ময়মনসিংহ সদর',
  Phulpur: 'ফুলপুর',
  Gafargaon: 'গফরগাঁও',
  Netrokona: 'নেত্রকোণা',
  Purbadhala: 'পূর্বধলা',
  Mohanganj: 'মোহনগঞ্জ',
  Barhatta: 'বরহাট্টা',
  Durgapur: 'দূর্গাপুর',
  Madan: 'মদন',
  'Netrokona Sadar': 'নেত্রকোণা সদর',
  Khaliajuri: 'খালিয়াজুরি',
  Kalmakanda: 'কলমাকান্দা',
  Kendua: 'কেন্দুয়া',
  Atpara: 'আটপাড়া',
  Sherpur: 'শেরপুর',
  Nalitabari: 'নালিতাবাড়ি',
  Jhenaigati: 'ঝিনাইগাতি',
  Sreebardi: 'শ্রীবরদী',
  Nakla: 'নাকলা',
  'Sherpur Sadar': 'শেরপুর সদর',
  Bogura: 'বগুড়া',
  Sherpur: 'শেরপুর',
  Dhunat: 'ধুনট',
  Nandigram: 'নন্দিগ্রাম',
  Adamdighi: 'আদমদিঘি',
  Shibganj: 'শিবগঞ্জ',
  Sariakandi: 'সারিয়াকান্দি',
  'Bogura Sadar': 'বগুড়া সদর',
  Gabtali: 'গাবতলী',
  Shajahanpur: 'শাজাহানপুর',
  Kahaloo: 'কাহালু',
  Sonatola: 'সোনাটলা',
  Dhupchanchia: 'ধুপচাঁচিয়া',
  'Chapai Nawabganj': 'চাঁপাই নবাবগঞ্জ',
  Nachole: 'নাচোল',
  Gomastapur: 'গোমস্তাপুর',
  Shibganj: 'শিবগঞ্জ',
  Bholahat: 'ভোলাহাট',
  'Chapai Nawabganj Sadar': 'চাঁপাই নবাবগঞ্জ সদর',
  Joypurhat: 'জয়পুরহাট',
  'Joypurhat Sadar': 'জয়পুরহাট সদর',
  Akkelpur: 'আক্কেলপুর',
  Panchbibi: 'পাঁচবিবি',
  Kalai: 'কালাই',
  Khetlal: 'ক্ষেতলাল',
  Naogaon: 'নওগাঁ',
  'Naogaon Sadar': 'নওগাঁ সদর',
  Porsha: 'পোরশা',
  Manda: 'মান্দা',
  Patnitala: 'পত্নিতলা',
  Atrai: 'আত্রাই',
  Badalgachhi: 'বাদলগাছী',
  Mohadevpur: 'মহাদেবপুর',
  Dhamoirhat: 'ধামইরহাট',
  Niamatpur: 'নিয়ামতপুর',
  Sapahar: 'সাপাহার',
  Raninagar: 'রাণীনগর',
  Natore: 'নাটোর',
  Bagatipara: 'বাগাতিপাড়া',
  'Natore Sadar': 'নাটোর সদর',
  Lalpur: 'লালপুর',
  Singra: 'সিংড়া',
  Gurudaspur: 'গুরুদাসপুর',
  Naldanga: 'নলডাঙ্গা',
  Baraigram: 'বড়াইগ্রাম',
  Pabna: 'পাবনা',
  Ishwardi: 'ঈশ্বরদী',
  Atgharia: 'আটঘরিয়া',
  'Pabna Sadar': 'পাবনা সদর',
  Santhia: 'সাঁথিয়া',
  Faridpur: 'ফরিদপুর',
  Chatmohar: 'চাটমোহর',
  Bera: 'বেড়া',
  Bhangura: 'ভাঙ্গুরা',
  Sujanagar: 'সুজানগর',
  Rajshahi: 'রাজশাহী',
  Charghat: 'চারঘাট',
  Paba: 'পবা',
  Bagmara: 'বাগমারা',
  Durgapur: 'দুর্গাপুর',
  Godagari: 'গোদাগাড়ি',
  Tanore: 'তানোর',
  Bagha: 'বাঘা',
  Puthia: 'পুঠিয়া',
  Mohanpur: 'মোহনপুর',
  Sirajganj: 'সিরাজগঞ্জ',
  Kazipur: 'কাজীপুর',
  Chauhali: 'চৌহালি',
  'Sirajganj Sadar': 'সিরাজগঞ্জ সদর',
  Tarash: 'তারাশ',
  Belkuchi: 'বেলকুচি',
  Ullahpara: 'উল্লাপাড়া',
  Shahjadpur: 'শাহজাদপুর',
  Kamarkhanda: 'কামারখন্দ',
  Raiganj: 'রায়গঞ্জ',
  Dinajpur: 'দিনাজপুর',
  Biral: 'বিরল',
  Hakimpur: 'হাকিমপুর',
  Chirirbandar: 'চিরিরবন্দর',
  Bochaganj: 'বোচাগঞ্জ',
  Kaharole: 'কাহারোল',
  Birganj: 'বীরগঞ্জ',
  Ghoraghat: 'ঘোড়াঘাট',
  Birampur: 'বিরামপুর',
  'Dinajpur Sadar': 'দিনাজপুর সদর',
  Nawabganj: 'নবাবগঞ্জ',
  Khansama: 'খানসামা',
  Parbatipur: 'পার্বতীপুর',
  Phulbari: 'ফুলবাড়ি',
  Gaibandha: 'গাইবান্ধা',
  Gobindaganj: 'গোবিন্দগঞ্জ',
  Palashbari: 'পলাশবাড়ী',
  Sundarganj: 'সুন্দরগঞ্জ',
  'Gaibandha Sadar': 'গাইবান্ধা সদর',
  Sadullapur: 'সাদুল্লাপুর',
  Phulchhari: 'ফুলছড়ি',
  Sughatta: 'সুঘাট্টা',
  Kurigram: 'কুড়িগ্রাম',
  Nageshwari: 'নাগেশ্বরী',
  'Char Rajibpur': 'চর রাজিবপুর',
  'Kurigram Sadar': 'কুড়িগ্রাম সদর',
  Phulbari: 'ফুলবাড়ি',
  Rajarhat: 'রাজারহাট',
  Ulipur: 'উলিপুর',
  Bhurungamari: 'ভুরুঙ্গামারি',
  Raomari: 'রাওমারি',
  Chilmari: 'চিলমারি',
  Lalmonirhat: 'লালমনিরহাট',
  Kaliganj: 'কালীগঞ্জ',
  Hatibandha: 'হাতীবান্ধা',
  Patgram: 'পাটগ্রাম',
  Aditmari: 'আদিতমারি',
  'Lalmonirhat Sadar': 'লালমনিরহাট সদর',
  Nilphamari: 'নীলফামারী',
  Kishoreganj: 'কিশোরগঞ্জ',
  Domar: 'ডোমার',
  'Nilphamari Sadar': 'নীলফামারী সদর',
  Jaldhaka: 'জলঢাকা',
  Saidpur: 'সৈয়দপুর',
  Dimla: 'ডিমলা',
  Panchagarh: 'পঞ্চগড়',
  Tetulia: 'তেতুলিয়া',
  Boda: 'বোদা',
  Debiganj: 'দেবীগঞ্জ',
  Atwari: 'আটওয়ারী',
  'Panchagarh Sadar': 'পঞ্চগড় সদর',
  Rangpur: 'রংপুর',
  Badarganj: 'বদরগঞ্জ',
  Mithapukur: 'মিঠাপুকুর',
  Pirganj: 'পীরগঞ্জ',
  Kaunia: 'কাউনিয়া',
  Taraganj: 'তারাগঞ্জ',
  Gangachhara: 'গঙ্গাচড়া',
  Pirgachha: 'পীরগাছা',
  'Rangpur Sadar': 'রংপুর সদর',
  Thakurgaon: 'ঠাকুরগাঁও',
  Haripur: 'হরিপুর',
  Ranisankail: 'রাণীশংকৈল',
  Baliadangi: 'বালিয়াডাঙ্গী',
  'Thakurgaon Sadar': 'ঠাকুরগাঁও সদর',
  Pirganj: 'পীরগঞ্জ',
  Habiganj: 'হবিগঞ্জ',
  Sayestaganj: 'সায়েস্তাগঞ্জ',
  Madhabpur: 'মাধবপুর',
  Lakhai: 'লাখাই',
  Ajmiriganj: 'আজমিরিগঞ্জ',
  Nabiganj: 'নবীগঞ্জ',
  'Habiganj Sadar': 'হবিগঞ্জ সদর',
  Bahubal: 'বাহুবল',
  Chunarughat: 'চুনারুঘাট',
  Baniyachong: 'বানিয়াচং',
  Moulvibazar: 'মৌলভীবাজার',
  'Moulvibazar Sadar': 'মৌলভীবাজার সদর',
  Sreemangal: 'শ্রীমঙ্গল',
  Kulaura: 'কুলাউরা',
  Kamalganj: 'কমলগঞ্জ',
  Juri: 'জুড়ি',
  Barlekha: 'বড়লেখা',
  Rajnagar: 'রাজনগর',
  Sunamganj: 'সুনামগঞ্জ',
  Derai: 'দেরাই',
  Sullah: 'সুল্লা',
  'Dakshin Sunamganj': 'দক্ষিণ সুনামগঞ্জ',
  Tahirpur: 'তাহিরপুর',
  Jamalganj: 'জামালগঞ্জ',
  Chhatak: 'ছাতক',
  Dharamapasha: 'ধরমপাশা',
  Bishwamvarpur: 'বিশ্বম্ভরপুর',
  Jagannathpur: 'জগন্নাথপুর',
  'Sunamganj Sadar': 'সুনামগঞ্জ সদর',
  Dowarabazar: 'দেৱার বাজার',
  Sylhet: 'সিলেট',
  Companigonj: 'কোম্পানিগঞ্জ',
  'Osmani Nagar': 'ওসমানী নগর',
  Golapganj: 'গোলাপগঞ্জ',
  Jaintiapur: 'জয়ন্তপুর',
  Balaganj: 'বালাগঞ্জ',
  Gowainghat: 'গোয়াইনঘাট',
  'Dakshin Surma': 'দক্ষিণ সুরমা',
  Kanaighat: 'কানাইঘাট',
  Bishwanath: 'বিশ্বনাথ',
  'Sylhet Sadar': 'সিলেট সদর',
  Fenchuganj: 'ফেঞ্চুগঞ্জ',
  Zakiganj: 'জকিগঞ্জ',
  Beanibazar: 'বিয়ানিবাজার'
}

const dumyData = [
  'Age',
  'Height',
  'Skin Color',
  'Profession',
  'Body Type',
  'Gender',
  'City',
  'Division',
  'District',
  'Upazilla',
  'Marital Status',
  'Profession',
  'Education Type',
  'College/Universtiy',
  'Category',
  'Ocupation',
  'Type'
]

export default dict
