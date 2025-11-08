// import { memo } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   useDisclosure
// } from "@chakra-ui/react";


// export const UserModal = memo(({ user, isOpen, onClose }: UserModalProps) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent p={5}>
//         <p style={{ textAlign: "center", color: "gray" }}>@{user.username}</p>
//       </ModalContent>
//     </Modal>
//   );
// });