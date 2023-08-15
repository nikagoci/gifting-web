import capitalizeWord from "./capitalizeWord";

export function translateCategory(category: string, lang?: string): string {
  if (lang === "ka") {
    return getGeorgianTranslation(category);
  }

  return capitalizeWord(category);
}

function getGeorgianTranslation(category: string): string {
  switch (category) {
    case "new-arrivals":
      return "ახალი ჩამოსული";
    case "household-items":
      return "სახლის ნივთები";
    case "electronics":
      return "ელექტრონიკა";
    case "clothes":
      return "ტანსაცმელი";
    case "other":
      return "სხვა";
    default:
      return category;
  }
}
