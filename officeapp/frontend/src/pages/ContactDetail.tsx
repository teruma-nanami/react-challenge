import { useParams } from "react-router-dom";

import ContactDetailView from "../components/contact/ContactDetailView";
import { useContactDetail } from "../hooks/useContactDetail";

function ContactDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    contact,

    // form state
    name,
    email,
    subject,
    category,
    message,
    status,
    internalNote,

    // handlers
    setStatus,
    setInternalNote,
    updateContact,

    // ui state
    loading,
    saving,
    error,
    success,
  } = useContactDetail(id);

  return (
    <ContactDetailView
      contact={contact}
      name={name}
      email={email}
      subject={subject}
      category={category}
      message={message}
      status={status}
      internalNote={internalNote}
      onChangeStatus={setStatus}
      onChangeInternalNote={setInternalNote}
      loading={loading}
      saving={saving}
      error={error}
      success={success}
      onSubmit={updateContact}
    />
  );
}

export default ContactDetail;
