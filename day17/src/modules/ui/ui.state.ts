import { atom, useAtom } from "jotai";

const showCreateWorkspaceModalAtom = atom<boolean>(false);
const showCreateChannelModalAtom = atom<boolean>(false);
const showUserSearchModalAtom = atom<boolean>(false);
const showProfileModalAtom = atom<boolean>(false);

export const useUiStore = () => {
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useAtom(
    showCreateWorkspaceModalAtom
  );
  const [showCreateChannelModal, setShowCreateChannelModal] = useAtom(
    showCreateChannelModalAtom
  );
  const [showUserSearchModal, setShowUserSearchModal] = useAtom(
    showUserSearchModalAtom
  );
  const [showProfileModal, setShowProfileModal] = useAtom(showProfileModalAtom);

  return {
    showCreateWorkspaceModal,
    setShowCreateWorkspaceModal,
    showCreateChannelModal,
    setShowCreateChannelModal,
    showUserSearchModal,
    setShowUserSearchModal,
    showProfileModal,
    setShowProfileModal,
  };
};
