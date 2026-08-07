import type { Artwork } from "../../types/artwork";
import "./ArtworkModal.css";

type ArtworkModalProps = {
  artwork: Artwork;
  onClose: () => void;
};

export const ArtworkModal = ({ artwork, onClose }: ArtworkModalProps) => {
  return (
    <div className="artwork-modal-overlay" onClick={onClose}>
      <div className="artwork-modal">
        <button onClick={onClose} className="modal-close" aria-label="Закрыть">
          ×
        </button>

        <div className="artwork-modal-content">
          <img
            className="artwork-modal-image"
            src={artwork.imageUrl}
            alt={artwork.title}
          />
          <div className="artwork-modal-info">
            <h2>{artwork.title}</h2>
            <p>{artwork.artist}</p>
            <p className="artwork-modal-description">{artwork.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
