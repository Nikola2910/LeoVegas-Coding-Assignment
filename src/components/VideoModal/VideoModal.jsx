import Popup from "reactjs-popup";

import YouTubePlayer from "../YoutubePlayer";

const VideoModal = ({ isTrailerLoading, isOpen, onCloseModal, videoKey }) => {
  if (isTrailerLoading)
    return (
      <Popup open={isOpen} modal onClose={onCloseModal}>
        <div style={{ padding: "50px" }}>
          <h6>Loading trailer...</h6>
        </div>
      </Popup>
    );

  return (
    <Popup open={isOpen} modal onClose={onCloseModal}>
      {videoKey ? (
        <YouTubePlayer videoKey={videoKey} />
      ) : (
        <div style={{ padding: "30px" }}>
          <h6>No trailer available. Try another movie</h6>
        </div>
      )}
    </Popup>
  );
};

export default VideoModal;
