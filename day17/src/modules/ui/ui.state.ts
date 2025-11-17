import { atom, useAtom } from "jotai";

const showCreateWorkspaceModalAtom = atom<boolean>(false);
const showCreateChannelModalAtom = atom<boolean>(false);

export const useUiStore = () => {
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useAtom(
    showCreateWorkspaceModalAtom
  );
  const [showCreateChannelModal, setShowCreateChannelModal] = useAtom(
    showCreateChannelModalAtom
  );

  return {
    showCreateWorkspaceModal,
    setShowCreateWorkspaceModal,
    showCreateChannelModal,
    setShowCreateChannelModal,
  };
};
