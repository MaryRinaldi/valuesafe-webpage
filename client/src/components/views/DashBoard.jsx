import React, {useState} from 'react'
import { Outlet } from "react-router-dom";
import { Swiper, SwiperSlide } from '../pages/SwiperWrapper.jsx';
import '../../App.css'
import Modal from '../pages/Modal.jsx'
import MapView from '../pages/MapView.jsx';




function DashBoard({darkMode}) {

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const switchModal = (content) => {
    closeModal();
    openModal(content);
    console.log(content)
  }
  

return (
<>
<div className="Dashboard">
<div className="title">
        <h1>VALUESAFE</h1>
        <h2>Risk Estimation and Building Depreciation Tool</h2>
      </div>
<div>
<MapView/>
  {showModal && <Modal showModal={showModal} closeModal={closeModal} modalContent={modalContent} />}
</div>
      <Outlet />      
    </div>
    </>
  );
}
export default DashBoard