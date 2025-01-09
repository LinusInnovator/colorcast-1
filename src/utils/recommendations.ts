interface Destination {
  city: string;
  country: string;
  temperature: number;
  description: string;
  affiliateUrl: string;
}

export const getOppositeDestination = (currentTemp: number, currentLocation: string): Destination => {
  // Prevent recommending the same location
  const isHot = currentTemp >= 25;
  
  if (isHot) {
    // For hot weather, recommend cool destinations
    const coolDestinations: Destination[] = [
      {
        city: "Reykjavik",
        country: "Iceland",
        temperature: 12,
        description: "Escape the heat with Iceland's refreshing breeze and stunning glaciers",
        affiliateUrl: "https://www.expedia.com/Reykjavik.d6054688.Destination-Travel-Guides"
      },
      {
        city: "Queenstown",
        country: "New Zealand",
        temperature: 15,
        description: "Trade the heat for crisp mountain air and adventure",
        affiliateUrl: "https://www.expedia.com/Queenstown.d180018.Destination-Travel-Guides"
      }
    ];
    return coolDestinations[Math.floor(Math.random() * coolDestinations.length)];
  } else {
    // For cold weather, recommend warm destinations
    const warmDestinations: Destination[] = [
      {
        city: "Bali",
        country: "Indonesia",
        temperature: 30,
        description: "Swap the cold for tropical paradise and warm ocean breezes",
        affiliateUrl: "https://www.expedia.com/Bali.d602651.Destination-Travel-Guides"
      },
      {
        city: "Maldives",
        country: "Maldives",
        temperature: 28,
        description: "Leave winter behind for crystal clear waters and endless summer",
        affiliateUrl: "https://www.expedia.com/Maldives.d6051181.Destination-Travel-Guides"
      }
    ];
    return warmDestinations[Math.floor(Math.random() * warmDestinations.length)];
  }
};