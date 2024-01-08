import Head from "next/head";
import Image from "next/image";
import requestIp from "request-ip";
import styles from "../styles/Home.module.css";

function Home({ ipAddress, country }) {
  return (
    <div className={styles.container}>
      <h1>
        Country name based on this {ipAddress} is {country}
      </h1>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // Use request-ip library to get the user's IP address
  const ipAddress = requestIp.getClientIp(req);

  // Use an IP geolocation service to determine the user's country
  const country = await getCountryFromIP(ipAddress);

  return {
    props: {
      ipAddress,
      country,
    },
  };
}

async function getCountryFromIP(ipAddress) {
  // Implement logic to fetch the country from an IP geolocation service
  // This could involve making an API request to a service like ipinfo.io
  // Example: const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
  // Parse the response and extract the country information
  // return response.json().country;
  try {
    const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
    console.log("response: ", response);
    return response.json().country;
  } catch (error) {
    return mockGetCountryFromIP(ipAddress);
  }
}

function mockGetCountryFromIP(ipAddress) {
  // Mock implementation - Replace this with actual logic to fetch the country
  // based on the IP address from a reliable IP geolocation service.
  // This is just an example and may not be accurate.
  return "United States";
}

export default Home;
