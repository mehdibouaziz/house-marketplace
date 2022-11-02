import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { list } from "firebase/storage";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Core swiper modules imports
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';
// swiper css
import 'swiper/css';
import 'swiper/css/bundle';


import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
import returnIcon from "../assets/svg/keyboardArrowRightIcon.svg";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  const shareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchlisting = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing({...docSnap.data(), id: params.listingId});
        setLoading(false);
      }
    };
    fetchlisting();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{clickable: true}}
      >
        {listing.imgUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='swiperSlideDiv'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>


      <div className="returnIconDiv" onClick={() => window.history.back()}>
        <img src={returnIcon} alt="share" />
      </div>
      <div className="shareIconDiv" onClick={shareClick}>
        <img src={shareIcon} alt="share" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation">
            {listing.location}
        </p>
        <p className="listingType">
            for {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
            <p className="discountPrice">
                ${listing.regularPrice - listing.discountedPrice} discount
            </p>
        )}

        <ul className="listingDetailsList">
            <li>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `1 Bedroom`}
            </li>
            <li>
                {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `1 Bathroom`}
            </li>
            {listing.parking &&
                <li>Parking Spot</li>
            }
            {listing.furnished &&
                <li>Furnished</li>
            }
        </ul>

        <p className="listingLocationTitle">
            Location
        </p>
        
        <div className="leafletContainer">
          <MapContainer
            style={{height:'100%',width: '100%',}}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />
            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
            <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="primaryButton" >Contact Landlord</Link>
        )}
      </div>
    </main>
  );
};

export default Listing;
