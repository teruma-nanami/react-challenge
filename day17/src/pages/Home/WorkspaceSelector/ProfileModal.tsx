import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { accountRepository } from "../../../modules/account/account.repository";
import { useCurrentUserStore } from "../../../modules/auth/current-user.state";
import { useUiStore } from "../../../modules/ui/ui.state";

function ProfileModal() {
  const { setShowProfileModal } = useUiStore();
  const { currentUser, setCurrentUser } = useCurrentUserStore();
  const [name, setName] = useState(currentUser!.name);
  const [thumbnail, setThumbnail] = useState<File | undefined>();
  const [thumbnailUrl, setThumbnailUrl] = useState(currentUser!.thumbnailUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfile = async () => {
    try {
      const user = await accountRepository.updateProfile(name, thumbnail);
      setCurrentUser(user);
      setShowProfileModal(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null || e.target.files[0] == null) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnail(file);
      setThumbnailUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div
      className="profile-modal-overlay"
      onClick={() => setShowProfileModal(false)}
    >
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>Edit your profile</h2>
        </div>

        <div className="profile-modal-content">
          <div className="profile-form">
            <div className="profile-form-left">
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="profile-input"
                />
              </div>
            </div>
            <div className="profile-form-right">
              <div className="profile-photo-section">
                <label>Profile photo</label>
                <div className="profile-photo-container">
                  <div className="profile-photo-placeholder">
                    <div className="profile-photo-circle" />
                    {thumbnailUrl != null ? (
                      <img
                        src={thumbnailUrl}
                        alt="Profile Thumbnail"
                        className="profile-photo-img"
                      />
                    ) : (
                      <div className="profile-photo-initials" />
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  className="upload-photo-button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-modal-footer">
          <button
            className="cancel-button"
            onClick={() => setShowProfileModal(false)}
          >
            Cancel
          </button>
          <button className="save-button" onClick={updateProfile}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileModal;
