const districts = [
  {
    barishal: {
      status: {
        code: 200,
        message: 'ok',
        date: 'Mon, 29 Apr 2024 06:52:29 GMT'
      },
      data: [
        {
          _id: 'barguna',
          district: 'Barguna',
          coordinates: '22.0953, 90.1121',
          upazilla: [
            'Barguna Sadar',
            'Taltali',
            'Bamna',
            'Amtali',
            'Betagi',
            'Patharghata'
          ]
        },
        {
          _id: 'barishal',
          district: 'Barishal',
          coordinates: '22.7022, 90.3696',
          upazilla: [
            'Hizla',
            'Mehendiganj',
            'Bakerganj',
            'Gaurnadi',
            'Muladi',
            'Wazirpur',
            'Banaripara',
            'Agailjhara',
            'Babuganj',
            'Barisal Sadar'
          ]
        },
        {
          _id: 'bhola',
          district: 'Bhola',
          coordinates: '22.1785, 90.7101',
          upazilla: [
            'Bhola Sadar',
            'Manpura',
            'Lalmohan',
            'Char Fasson',
            'Burhanuddin',
            'Tazumuddin',
            'Daulatkhan'
          ]
        },
        {
          _id: 'jhalokati',
          district: 'Jhalokati',
          coordinates: '22.5721, 90.1870',
          upazilla: ['Kathalia', 'Rajapur', 'Jhalokati Sadar', 'Nalchhiti']
        },
        {
          _id: 'patuakhali',
          district: 'Patuakhali',
          coordinates: '22.2249, 90.4548',
          upazilla: [
            'Kalapara',
            'Patuakhali Sadar',
            'Dumki',
            'Dashmina',
            'Galachipa',
            'Rangabali',
            'Bauphal',
            'Mirzaganj'
          ]
        },
        {
          _id: 'pirojpur',
          district: 'Pirojpur',
          coordinates: '22.5791, 89.9759',
          upazilla: [
            'Bhandaria',
            'Nazirpur',
            'Mathbaria',
            'Indurkani',
            'Pirojpur Sadar',
            'Kawkhali',
            'Nesarabad (Swarupkati)'
          ]
        }
      ]
    }
  },
  {
    chattogram: {
      status: {
        code: 200,
        message: 'ok',
        date: 'Mon, 29 Apr 2024 06:52:34 GMT'
      },
      data: [
        {
          _id: 'bandarban',
          district: 'Bandarban',
          coordinates: '21.8311, 92.3686',
          upazilla: [
            'Ali Kadam',
            'Thanchi',
            'Lama',
            'Bandarban Sadar',
            'Rowangchhari',
            'Naikhongchhari',
            'Ruma'
          ]
        },
        {
          _id: 'brahmanbaria',
          district: 'Brahmanbaria',
          coordinates: '23.9608, 91.1115',
          upazilla: [
            'Akhaura',
            'Nasirnagar',
            'Bancharampur',
            'Sarail',
            'Ashuganj',
            'Bijoynagar',
            'Nabinagar',
            'Kasba',
            'Brahmanbaria Sadar'
          ]
        },
        {
          _id: 'chandpur',
          district: 'Chandpur',
          coordinates: '23.2513, 90.8518',
          upazilla: [
            'Haziganj',
            'Faridganj',
            'Matlab Dakshin',
            'Chandpur Sadar',
            'Kachua',
            'Haimchar',
            'Shahrasti',
            'Matlab Uttar'
          ]
        },
        {
          _id: 'chattogram',
          district: 'Chattogram',
          coordinates: '22.5150, 91.7539',
          upazilla: [
            'Rangunia',
            'Sitakunda',
            'Boalkhali',
            'Patiya',
            'Banshkhali',
            'Karnaphuli',
            'Lohagara',
            'Hathazari',
            'Mirsharai',
            'Sandwip',
            'Raozan',
            'Chandanaish',
            'Fatikchhari',
            'Anwara',
            'Satkania'
          ]
        },
        {
          _id: "cox's bazar",
          district: "Cox's Bazar",
          coordinates: '21.5641, 92.0282',
          upazilla: [
            'Maheshkhali',
            'Chakaria',
            "Cox's Bazar Sadar",
            'Ukhia',
            'Pekua',
            'Ramu',
            'Teknaf',
            'Kutubdia'
          ]
        },
        {
          _id: 'cumilla',
          district: 'Cumilla',
          coordinates: '23.4576, 91.1809',
          upazilla: [
            'Titas',
            'Monohargonj',
            'Chandina',
            'Cumilla Adarsha Sadar',
            'Meghna',
            'Nangalkot',
            'Chauddagram',
            'Barura',
            'Cumilla Sadar Dakshin',
            'Laksam',
            'Daudkandi',
            'Homna',
            'Burichang',
            'Debidwar',
            'Muradnagar',
            'Brahmanpara',
            'Lalmai'
          ]
        },
        {
          _id: 'feni',
          district: 'Feni',
          coordinates: '22.9409, 91.4067',
          upazilla: [
            'Fulgazi',
            'Parshuram',
            'Feni Sadar',
            'Sonagazi',
            'Daganbhuiyan',
            'Chhagalnaiya'
          ]
        },
        {
          _id: 'khagrachari',
          district: 'Khagrachari',
          coordinates: '23.1322, 91.9490',
          upazilla: [
            'Lakshmichhari',
            'Panchhari',
            'Mahalchhari',
            'Dighinala',
            'Manikchhari',
            'Matiranga',
            'Ramgarh',
            'Khagrachhari Sadar'
          ]
        },
        {
          _id: 'lakshmipur',
          district: 'Lakshmipur',
          coordinates: '22.9447, 90.8282',
          upazilla: [
            'Raipur',
            'Ramganj',
            'Lakshmipur Sadar',
            'Ramgati',
            'Kamalnagar'
          ]
        },
        {
          _id: 'noakhali',
          district: 'Noakhali',
          coordinates: '22.8724, 91.0973',
          upazilla: [
            'Subarnachar',
            'Hatiya',
            'Kabirhat',
            'Noakhali Sadar',
            'Begumganj',
            'Senbagh',
            'Sonaimuri',
            'Chatkhil',
            'Companiganj'
          ]
        },
        {
          _id: 'rangamati',
          district: 'Rangamati',
          coordinates: '22.7324, 92.2985',
          upazilla: [
            'Rajasthali',
            'Kawkhali',
            'Belaichhari',
            'Kaptai',
            'Barkal',
            'Juraichhari',
            'Naniyachar',
            'Rangamati Sadar',
            'Bagaichhari',
            'Langadu'
          ]
        }
      ]
    }
  },
  {
    dhaka: {
      status: {
        code: 200,
        message: 'ok',
        date: 'Mon, 29 Apr 2024 06:52:35 GMT'
      },
      data: [
        {
          _id: 'dhaka',
          district: 'Dhaka',
          coordinates: '23.8105, 90.3372',
          upazilla: ['Dhamrai', 'Dohar', 'Savar', 'Keraniganj', 'Nawabganj']
        },
        {
          _id: 'faridpur',
          district: 'Faridpur',
          coordinates: '23.5424, 89.6309',
          upazilla: [
            'Bhanga',
            'Madhukhali',
            'Boalmari',
            'Charbhadrasan',
            'Faridpur Sadar',
            'Saltha',
            'Sadarpur',
            'Alfadanga',
            'Nagarkanda'
          ]
        },
        {
          _id: 'gazipur',
          district: 'Gazipur',
          coordinates: '24.0958, 90.4125',
          upazilla: [
            'Sreepur',
            'Kapasia',
            'Gazipur Sadar',
            'Kaliakair',
            'Kaliganj'
          ]
        },
        {
          _id: 'gopalganj',
          district: 'Gopalganj',
          coordinates: '23.0488, 89.8879',
          upazilla: [
            'Gopalganj Sadar',
            'Muksudpur',
            'Kotalipara',
            'Tungipara',
            'Kashiani'
          ]
        },
        {
          _id: 'kishoreganj',
          district: 'Kishoreganj',
          coordinates: '24.4260, 90.9821',
          upazilla: [
            'Austagram',
            'Mithamain',
            'Kuliarchar',
            'Pakundia',
            'Karimganj',
            'Bajitpur',
            'Kishoreganj Sadar',
            'Itna',
            'Bhairab',
            'Hossainpur',
            'Katiadi',
            'Nikli',
            'Tarail'
          ]
        },
        {
          _id: 'madaripur',
          district: 'Madaripur',
          coordinates: '23.2393, 90.1870',
          upazilla: ['Shibchar', 'Madaripur Sadar', 'Rajoir', 'Kalkini']
        },
        {
          _id: 'manikganj',
          district: 'Manikganj',
          coordinates: '23.8617, 90.0003',
          upazilla: [
            'Manikgonj Sadar',
            'Ghior',
            'Daulatpur',
            'Harirampur',
            'Saturia',
            'Shivalaya',
            'Singair'
          ]
        },
        {
          _id: 'munshiganj',
          district: 'Munshiganj',
          coordinates: '23.4981, 90.4127',
          upazilla: [
            'Sirajdikhan',
            'Sreenagar',
            'Lohajang',
            'Tongibari',
            'Gazaria',
            'Munshiganj Sadar'
          ]
        },
        {
          _id: 'narayanganj',
          district: 'Narayanganj',
          coordinates: '23.7147, 90.5636',
          upazilla: [
            'Araihazar',
            'Bandar',
            'Narayanganj Sadar',
            'Rupganj',
            'Sonargaon'
          ]
        },
        {
          _id: 'narsingdi',
          district: 'Narsingdi',
          coordinates: '24.1344, 90.7860',
          upazilla: [
            'Palash',
            'Raipura',
            'Belabo',
            'Narsingdi Sadar',
            'Monohardi',
            'Shibpur'
          ]
        },
        {
          _id: 'rajbari',
          district: 'Rajbari',
          coordinates: '23.7151, 89.5875',
          upazilla: [
            'Baliakandi',
            'Goalandaghat',
            'Kalukhali',
            'Pangsha',
            'Rajbari Sadar'
          ]
        },
        {
          _id: 'shariatpur',
          district: 'Shariatpur',
          coordinates: '23.2423, 90.4348',
          upazilla: [
            'Naria',
            'Zajira',
            'Damudya',
            'Bhedarganj',
            'Gosairhat',
            'Shariatpur Sadar'
          ]
        },
        {
          _id: 'tangail',
          district: 'Tangail',
          coordinates: '24.3917, 89.9948',
          upazilla: [
            'Delduar',
            'Dhanbari',
            'Sakhipur',
            'Madhupur',
            'Ghatail',
            'Bhuapur',
            'Kalihati',
            'Tangail Sadar',
            'Gopalpur',
            'Nagarpur',
            'Basail',
            'Mirzapur'
          ]
        }
      ]
    }
  },
  {
    khulna: {
      status: {
        code: 200,
        message: 'ok',
        date: 'Mon, 29 Apr 2024 06:52:30 GMT'
      },
      data: [
        {
          _id: 'bagerhat',
          district: 'Bagerhat',
          coordinates: '22.6602, 89.7895',
          upazilla: [
            'Kachua',
            'Chitalmari',
            'Rampal',
            'Fakirhat',
            'Morrelganj',
            'Sarankhola',
            'Mollahat',
            'Bagerhat Sadar',
            'Mongla'
          ]
        },
        {
          _id: 'chuadanga',
          district: 'Chuadanga',
          coordinates: '23.6161, 88.8263',
          upazilla: ['Damurhuda', 'Chuadanga Sadar', 'Jibannagar', 'Alamdanga']
        },
        {
          _id: 'jashore',
          district: 'Jashore',
          coordinates: '23.1634, 89.2182',
          upazilla: [
            'Sharsha',
            'Chaugachha',
            'Bagherpara',
            'Jhikargachha',
            'Manirampur',
            'Abhaynagar',
            'Keshabpur',
            'Jashore Sadar'
          ]
        },
        {
          _id: 'jhenaidah',
          district: 'Jhenaidah',
          coordinates: '23.5450, 89.1726',
          upazilla: [
            'Jhenaidah Sadar',
            'Shailkupa',
            'Harinakunda',
            'Kaliganj',
            'Kotchandpur',
            'Maheshpur'
          ]
        },
        {
          _id: 'khulna',
          district: 'Khulna',
          coordinates: '22.6738, 89.3967',
          upazilla: [
            'Rupsha',
            'Batiaghata',
            'Dumuria',
            'Phultala',
            'Koyra',
            'Terokhada',
            'Dacope',
            'Dighalia',
            'Paikgachha'
          ]
        },
        {
          _id: 'kushtia',
          district: 'Kushtia',
          coordinates: '23.8907, 89.1099',
          upazilla: [
            'Bheramara',
            'Daulatpur',
            'Mirpur',
            'Kushtia Sadar',
            'Khoksa',
            'Kumarkhali'
          ]
        },
        {
          _id: 'magura',
          district: 'Magura',
          coordinates: '23.4290, 89.4364',
          upazilla: ['Magura Sadar', 'Shalikha', 'Sreepur', 'Mohammadpur']
        },
        {
          _id: 'meherpur',
          district: 'Meherpur',
          coordinates: '23.8052, 88.6724',
          upazilla: ['Meherpur Sadar', 'Gangni', 'Mujibnagar']
        },
        {
          _id: 'narail',
          district: 'Narail',
          coordinates: '23.1163, 89.5840',
          upazilla: ['Lohagara', 'Kalia', 'Narail Sadar']
        },
        {
          _id: 'satkhira',
          district: 'Satkhira',
          coordinates: '22.3155, 89.1115',
          upazilla: [
            'Shyamnagar',
            'Satkhira Sadar',
            'Kalaroa',
            'Assasuni',
            'Kaliganj',
            'Tala',
            'Debhata'
          ]
        }
      ]
    }
  },
  {
    mymensingh: {
      status: {
        code: 200,
        message: 'ok',
        date: 'Mon, 29 Apr 2024 06:52:35 GMT'
      },
      data: [
        {
          _id: 'jamalpur',
          district: 'Jamalpur',
          coordinates: '25.0831, 89.7853',
          upazilla: [
            'Baksiganj',
            'Madarganj',
            'Dewanganj',
            'Melandaha',
            'Jamalpur Sadar',
            'Sarishabari',
            'Islampur'
          ]
        },
        {
          _id: 'mymensingh',
          district: 'Mymensingh',
          coordinates: '24.7539, 90.4073',
          upazilla: [
            'Gafargaon',
            'Tara Khanda',
            'Dhobaura',
            'Muktagachha',
            'Gauripur',
            'Bhaluka',
            'Fulbaria',
            'Haluaghat',
            'Nandail',
            'Trishal',
            'Phulpur',
            'Ishwarganj',
            'Mymensingh Sadar'
          ]
        },
        {
          _id: 'netrokona',
          district: 'Netrokona',
          coordinates: '24.8103, 90.8656',
          upazilla: [
            'Purbadhala',
            'Mohanganj',
            'Barhatta',
            'Khaliajuri',
            'Kalmakanda',
            'Madan',
            'Netrokona Sadar',
            'Kendua',
            'Durgapur',
            'Atpara'
          ]
        },
        {
          _id: 'sherpur',
          district: 'Sherpur',
          coordinates: '25.0746, 90.1495',
          upazilla: [
            'Nakla',
            'Sreebardi',
            'Nalitabari',
            'Jhenaigati',
            'Sherpur Sadar'
          ]
        }
      ]
    }
  },
  {
    rajshahi: {
      status: {
        code: 200,
        message: 'ok',
        date: 'Mon, 29 Apr 2024 06:52:35 GMT'
      },
      data: [
        {
          _id: 'bogura',
          district: 'Bogura',
          coordinates: '24.8510, 89.3697',
          upazilla: [
            'Dhunat',
            'Gabtali',
            'Sonatola',
            'Sariakandi',
            'Adamdighi',
            'Dhupchanchia',
            'Nandigram',
            'Bogura Sadar',
            'Shajahanpur',
            'Sherpur',
            'Shibganj',
            'Kahaloo'
          ]
        },
        {
          _id: 'chapai nawabganj',
          district: 'Chapai Nawabganj',
          coordinates: '24.7413, 88.2912',
          upazilla: [
            'Chapai Nawabganj Sadar',
            'Shibganj',
            'Nachole',
            'Gomastapur',
            'Bholahat'
          ]
        },
        {
          _id: 'joypurhat',
          district: 'Joypurhat',
          coordinates: '25.0947, 89.0945',
          upazilla: [
            'Panchbibi',
            'Kalai',
            'Khetlal',
            'Akkelpur',
            'Joypurhat Sadar'
          ]
        },
        {
          _id: 'naogaon',
          district: 'Naogaon',
          coordinates: '24.9132, 88.7531',
          upazilla: [
            'Patnitala',
            'Manda',
            'Naogaon Sadar',
            'Badalgachhi',
            'Niamatpur',
            'Mohadevpur',
            'Atrai',
            'Sapahar',
            'Porsha',
            'Dhamoirhat',
            'Raninagar'
          ]
        },
        {
          _id: 'natore',
          district: 'Natore',
          coordinates: '24.4102, 89.0076',
          upazilla: [
            'Naldanga',
            'Singra',
            'Natore Sadar',
            'Bagatipara',
            'Lalpur',
            'Gurudaspur',
            'Baraigram'
          ]
        },
        {
          _id: 'pabna',
          district: 'Pabna',
          coordinates: '24.1585, 89.4481',
          upazilla: [
            'Sujanagar',
            'Ishwardi',
            'Santhia',
            'Bhangura',
            'Chatmohar',
            'Bera',
            'Atgharia',
            'Pabna Sadar',
            'Faridpur'
          ]
        },
        {
          _id: 'rajshahi',
          district: 'Rajshahi',
          coordinates: '24.3733, 88.6049',
          upazilla: [
            'Durgapur',
            'Godagari',
            'Puthia',
            'Charghat',
            'Mohanpur',
            'Paba',
            'Bagmara',
            'Bagha',
            'Tanore'
          ]
        },
        {
          _id: 'sirajganj',
          district: 'Sirajganj',
          coordinates: '24.3141, 89.5700',
          upazilla: [
            'Sirajganj Sadar',
            'Kazipur',
            'Chauhali',
            'Tarash',
            'Belkuchi',
            'Kamarkhanda',
            'Ullahpara',
            'Raiganj',
            'Shahjadpur'
          ]
        }
      ]
    }
  },
  {
    rangpur: {
      status: {
        code: 200,
        message: 'ok',
        date: 'Mon, 29 Apr 2024 06:52:34 GMT'
      },
      data: [
        {
          _id: 'dinajpur',
          district: 'Dinajpur',
          coordinates: '25.6279, 88.6332',
          upazilla: [
            'Phulbari',
            'Hakimpur',
            'Birampur',
            'Khansama',
            'Biral',
            'Nawabganj',
            'Parbatipur',
            'Bochaganj',
            'Kaharole',
            'Ghoraghat',
            'Dinajpur Sadar',
            'Birganj',
            'Chirirbandar'
          ]
        },
        {
          _id: 'gaibandha',
          district: 'Gaibandha',
          coordinates: '25.3297, 89.5430',
          upazilla: [
            'Palashbari',
            'Sughatta',
            'Sundarganj',
            'Phulchhari',
            'Gaibandha Sadar',
            'Gobindaganj',
            'Sadullapur'
          ]
        },
        {
          _id: 'kurigram',
          district: 'Kurigram',
          coordinates: '25.8072, 89.6295',
          upazilla: [
            'Chilmari',
            'Bhurungamari',
            'Phulbari',
            'Ulipur',
            'Nageshwari',
            'Rajarhat',
            'Raomari',
            'Char Rajibpur',
            'Kurigram Sadar'
          ]
        },
        {
          _id: 'lalmonirhat',
          district: 'Lalmonirhat',
          coordinates: '25.9923, 89.2847',
          upazilla: [
            'Patgram',
            'Kaliganj',
            'Aditmari',
            'Hatibandha',
            'Lalmonirhat Sadar'
          ]
        },
        {
          _id: 'nilphamari',
          district: 'Nilphamari',
          coordinates: '25.8483, 88.9414',
          upazilla: [
            'Jaldhaka',
            'Nilphamari Sadar',
            'Saidpur',
            'Kishoreganj',
            'Dimla',
            'Domar'
          ]
        },
        {
          _id: 'panchagarh',
          district: 'Panchagarh',
          coordinates: '26.2709, 88.5952',
          upazilla: [
            'Panchagarh Sadar',
            'Boda',
            'Tetulia',
            'Atwari',
            'Debiganj'
          ]
        },
        {
          _id: 'rangpur',
          district: 'Rangpur',
          coordinates: '25.7468, 89.2508',
          upazilla: [
            'Badarganj',
            'Gangachhara',
            'Kaunia',
            'Rangpur Sadar',
            'Taraganj',
            'Pirgachha',
            'Mithapukur',
            'Pirganj'
          ]
        },
        {
          _id: 'thakurgaon',
          district: 'Thakurgaon',
          coordinates: '26.0418, 88.4283',
          upazilla: [
            'Baliadangi',
            'Ranisankail',
            'Pirganj',
            'Thakurgaon Sadar',
            'Haripur'
          ]
        }
      ]
    }
  },
  {
    sylhet: {
      status: {
        code: 200,
        message: 'ok',
        date: 'Mon, 29 Apr 2024 06:52:34 GMT'
      },
      data: [
        {
          _id: 'habiganj',
          district: 'Habiganj',
          coordinates: '24.7539, 90.4073',
          upazilla: [
            'Bahubal',
            'Sayestaganj',
            'Ajmiriganj',
            'Chunarughat',
            'Nabiganj',
            'Baniyachong',
            'Lakhai',
            'Habiganj Sadar',
            'Madhabpur'
          ]
        },
        {
          _id: 'moulvibazar',
          district: 'Moulvibazar',
          coordinates: '24.8103, 90.8656',
          upazilla: [
            'Juri',
            'Sreemangal',
            'Barlekha',
            'Kulaura',
            'Moulvibazar Sadar',
            'Rajnagar',
            'Kamalganj'
          ]
        },
        {
          _id: 'sunamganj',
          district: 'Sunamganj',
          coordinates: '25.0715, 91.3992',
          upazilla: [
            'Dakshin Sunamganj',
            'Jamalganj',
            'Chhatak',
            'Sullah',
            'Dharamapasha',
            'Tahirpur',
            'Jagannathpur',
            'Derai',
            'Bishwamvarpur',
            'Dowarabazar',
            'Sunamganj Sadar'
          ]
        },
        {
          _id: 'sylhet',
          district: 'Sylhet',
          coordinates: '24.8993, 91.8700',
          upazilla: [
            'Osmani Nagar',
            'Companigonj',
            'Golapganj',
            'Kanaighat',
            'Fenchuganj',
            'Zakiganj',
            'Bishwanath',
            'Sylhet Sadar',
            'Beanibazar',
            'Gowainghat',
            'Balaganj',
            'Dakshin Surma',
            'Jaintiapur'
          ]
        }
      ]
    }
  }
]

export { districts }
