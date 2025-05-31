import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import SubscribeContextProvider from '../context/subscribeContext'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <SubscribeContextProvider>
        <NewsLetterBox />
      </SubscribeContextProvider>
    </div>
  )
}

export default Home
