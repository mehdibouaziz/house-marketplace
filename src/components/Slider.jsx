import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebase.config"
import Spinner from "../components/Spinner"

// Core swiper modules imports
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';
// swiper css
import 'swiper/css';
import 'swiper/css/bundle';


const Slider = () => {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
            const querySnap = await getDocs(q)
            let listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings(listings)
            setLoading(false)
        }
        fetchListings()
    
    }, [])
    
    if(loading){return <Spinner />}

    if(listings.length === 0){return <></>}

  return listings && (
    <>
        <p className="exploreHeading">Recommended</p>
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            pagination={{clickable: true}}
        >
            {listings.map(({data, id}) => (
                <SwiperSlide key={id} onClick={() => {navigate(`/category/${data.type}/${id}`)}}>
                <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                    height:'30vh'
                  }}
                  className='swiperSlideDiv'
                >
                    <p className="swiperSlideText">{data.name}</p>
                    <p className="swiperSlidePrice">$ {data.discountedPrice?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? data.regularPrice.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{data.type === 'rent' && ' / month'}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
    </>
  )
}

export default Slider