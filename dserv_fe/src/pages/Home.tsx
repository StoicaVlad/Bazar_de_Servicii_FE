import BestServicesTable from "../components/Homepage/BestServicesTable";
import HomeCarousel from "../components/Homepage/Carousel";

const Home = () => {
  const images = ['https://images.pexels.com/photos/3851254/pexels-photo-3851254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
   "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
   "https://images.pexels.com/photos/4065400/pexels-photo-4065400.jpeg"];
  return (
    <>
    <HomeCarousel {...images}/>
    <div style={{textAlign:'center', alignItems:'center'}}>
      <h1>Best Services in your city</h1>
      <BestServicesTable />
    </div>
    </>
  );
};

export default Home;
