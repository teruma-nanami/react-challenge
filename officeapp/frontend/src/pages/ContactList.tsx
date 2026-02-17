// src/pages/ContactList.tsx
import ContactListView from "../components/contact/ContactListView";
import { useContactList } from "../hooks/useContactList";

function ContactList() {
  const { contacts, loading, error, fetchContacts } = useContactList();

  return (
    <ContactListView
      contacts={contacts}
      loading={loading}
      error={error}
      onRetry={fetchContacts}
    />
  );
}

export default ContactList;
