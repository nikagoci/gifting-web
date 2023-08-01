export interface City {
  content: string;
  value: string;
}

const cities: City[] = [
  {
    content: "Tbilisi",
    value: "tbilisi",
  },
  {
    content: "Kutaisi",
    value: "kutaisi",
  },
  {
    content: "Batumi",
    value: "batumi",
  },
  {
    content: "Rustavi",
    value: "rustavi",
  },
  {
    content: "Gori",
    value: "gori",
  },
  {
    content: "Poti",
    value: "poti",
  },
  {
    content: "Zugdidi",
    value: "zugdidi",
  },
  {
    content: "Samtredia",
    value: "samtredia",
  },
  {
    content: "Khashuri",
    value: "khashuri",
  },
  {
    content: "Senaki",
    value: "senaki",
  },
  {
    content: "Marneuli",
    value: "marneuli",
  },
  {
    content: "Kobuleti",
    value: "kobuleti",
  },
  {
    content: "Gardabani",
    value: "gardabani",
  },
  {
    content: "Telavi",
    value: "telavi",
  },
  {
    content: "Akhaltsikhe",
    value: "akhaltsikhe",
  },
  {
    content: "Zestafoni",
    value: "zestafoni",
  },
];


export function translateCities(lang: string): City[] {
  if (lang === 'ka') {
    return cities.map((city) => ({
      ...city,
      content: getGeorgianTranslation(city.value),
    }));
  } else {
    return cities;
  }
}

function getGeorgianTranslation(cityValue: string): string {
  switch (cityValue) {
    case 'tbilisi':
      return 'თბილისი';
    case 'kutaisi':
      return 'ქუთაისი';
    case 'batumi':
      return 'ბათუმი';
    case 'rustavi':
      return 'რუსთავი';
    case 'gori':
      return 'გორი';
    case 'poti':
      return 'ფოთი';
    case 'zugdidi':
      return 'ზუგდიდი';
    case 'samtredia':
      return 'სამტრედია';
    case 'khashuri':
      return 'ხაშური';
    case 'senaki':
      return 'სენაკი';
    case 'marneuli':
      return 'მარნეული';
    case 'kobuleti':
      return 'ქობულეთი';
    case 'gardabani':
      return 'გარდაბანი';
    case 'telavi':
      return 'თელავი';
    case 'akhaltsikhe':
      return 'ახალციხე';
    case 'zestafoni':
      return 'ზესტაფონი';
    default:
      return cityValue;
  }
}

export default cities;
