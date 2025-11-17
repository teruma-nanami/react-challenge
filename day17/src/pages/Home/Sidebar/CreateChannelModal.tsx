import { useState } from "react";
import { useUiStore } from "../../../modules/ui/ui.state";

interface Props {
  onSubmit(name: string): void;
}

function CreateChannelModal(props: Props) {
  const { onSubmit } = props;
  const { setShowCreateChannelModal } = useUiStore();
  const [channelName, setChannelName] = useState("");
  return (
    <div
      className="profile-modal-overlay"
      onClick={() => setShowCreateChannelModal(false)}
    >
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>新しいチャンネルを作成</h2>
        </div>

        <div className="profile-modal-content">
          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="channelName">チャンネル名</label>
              <input
                type="text"
                id="channelName"
                name="channelName"
                className="profile-input"
                placeholder="新しいチャンネル名を入力してください"
                autoFocus
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
              <div className="help-text">
                小文字、数字、ハイフンを使用して、チャンネルの目的がわかりやすい名前を設定してください。
              </div>
            </div>
          </div>
        </div>

        <div className="profile-modal-footer">
          <button
            className="cancel-button"
            onClick={() => setShowCreateChannelModal(false)}
          >
            キャンセル
          </button>
          <button className="save-button" onClick={() => onSubmit(channelName)}>
            作成
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateChannelModal;
