import { Tr, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import type { InventoryItem } from "../../types/item";
import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  item: InventoryItem;
};

function InventoryRow({ item }: Props) {
  const navigate = useNavigate();

  return (
    <Tr>
      <Td>{item.id}</Td>
      <Td>{item.sku ?? "-"}</Td>
      <Td>{item.name}</Td>
      <Td isNumeric>{item.quantity}</Td>
      <Td>{item.is_active === true || item.is_active === 1 ? "Yes" : "No"}</Td>
      <Td>
        <PrimaryButton
          size="sm"
          onClick={() => navigate(`/inventory/${item.id}`)}
        >
          詳細
        </PrimaryButton>
      </Td>
    </Tr>
  );
}

export default InventoryRow;
