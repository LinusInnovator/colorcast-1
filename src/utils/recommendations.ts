interface Destination {
  city: string;
  country: string;
  temperature: number;
  description: string;
  affiliateUrl: string;
  imageUrl: string;
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
        affiliateUrl: "https://www.expedia.com/Reykjavik.d6054688.Destination-Travel-Guides",
        imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&h=600"
      },
      {
        city: "Queenstown",
        country: "New Zealand",
        temperature: 15,
        description: "Trade the heat for crisp mountain air and adventure",
        affiliateUrl: "https://www.expedia.com/Queenstown.d180018.Destination-Travel-Guides",
        imageUrl: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?auto=format&fit=crop&w=800&h=600"
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
        affiliateUrl: "https://www.expedia.com/Bali.d602651.Destination-Travel-Guides",
        imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=600"
      },
      {
        city: "Maldives",
        country: "Maldives",
        temperature: 28,
        description: "Leave winter behind for crystal clear waters and endless summer",
        affiliateUrl: "https://www.expedia.com/Maldives.d6051181.Destination-Travel-Guides",
        imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&h=600"
      }
    ];
    return warmDestinations[Math.floor(Math.random() * warmDestinations.length)];
  }
};

export const getDestinationsForTemperature = async (targetTemp: number): Promise<Destination[]> => {
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const destinations: Destination[] = [
    // Cold destinations (-10°C to 5°C)
    {
      city: "Reykjavik",
      country: "Iceland",
      temperature: 2,
      description: "Northern lights and volcanic landscapes",
      affiliateUrl: "https://www.expedia.com/Reykjavik.d6054688.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Tromsø",
      country: "Norway",
      temperature: 0,
      description: "Arctic adventures and midnight sun",
      affiliateUrl: "https://www.expedia.com/Tromso.d6127286.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Queenstown",
      country: "New Zealand",
      temperature: 5,
      description: "Alpine scenery and adventure sports",
      affiliateUrl: "https://www.expedia.com/Queenstown.d180018.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?auto=format&fit=crop&w=800&h=600"
    },
    // Cool destinations (6°C to 15°C)
    {
      city: "Edinburgh",
      country: "Scotland",
      temperature: 12,
      description: "Historic charm and rolling hills",
      affiliateUrl: "https://www.expedia.com/Edinburgh.d6069845.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Vancouver",
      country: "Canada",
      temperature: 15,
      description: "Mountains meet the ocean",
      affiliateUrl: "https://www.expedia.com/Vancouver.d178315.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Portland",
      country: "USA",
      temperature: 14,
      description: "Quirky culture and natural beauty",
      affiliateUrl: "https://www.expedia.com/Portland.d178299.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1541457523724-95f54f7740cc?auto=format&fit=crop&w=800&h=600"
    },
    // Mild destinations (16°C to 22°C)
    {
      city: "San Francisco",
      country: "USA",
      temperature: 18,
      description: "Tech hub with iconic views",
      affiliateUrl: "https://www.expedia.com/San-Francisco.d178305.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Lisbon",
      country: "Portugal",
      temperature: 20,
      description: "Coastal charm and vibrant culture",
      affiliateUrl: "https://www.expedia.com/Lisbon-District.d178278.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Melbourne",
      country: "Australia",
      temperature: 21,
      description: "Culture, coffee, and street art",
      affiliateUrl: "https://www.expedia.com/Melbourne.d178283.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=800&h=600"
    },
    // Warm destinations (23°C to 30°C)
    {
      city: "Barcelona",
      country: "Spain",
      temperature: 25,
      description: "Mediterranean beauty and architecture",
      affiliateUrl: "https://www.expedia.com/Barcelona.d179992.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Bali",
      country: "Indonesia",
      temperature: 28,
      description: "Tropical paradise and cultural richness",
      affiliateUrl: "https://www.expedia.com/Bali.d602651.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Miami",
      country: "USA",
      temperature: 27,
      description: "Beach life and vibrant culture",
      affiliateUrl: "https://www.expedia.com/Miami.d178286.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=800&h=600"
    },
    // Hot destinations (31°C and above)
    {
      city: "Dubai",
      country: "UAE",
      temperature: 35,
      description: "Modern luxury in the desert",
      affiliateUrl: "https://www.expedia.com/Dubai.d1079.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Marrakech",
      country: "Morocco",
      temperature: 33,
      description: "Ancient medinas and desert adventures",
      affiliateUrl: "https://www.expedia.com/Marrakech.d6084756.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1597211684565-dca64d72c3f5?auto=format&fit=crop&w=800&h=600"
    },
    {
      city: "Bangkok",
      country: "Thailand",
      temperature: 32,
      description: "Street food paradise and temples",
      affiliateUrl: "https://www.expedia.com/Bangkok.d178236.Destination-Travel-Guides",
      imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&h=600"
    }
  ];

  // Filter destinations based on temperature range (within ±5°C of target)
  return destinations.filter(dest => 
    Math.abs(dest.temperature - targetTemp) <= 5
  );
};