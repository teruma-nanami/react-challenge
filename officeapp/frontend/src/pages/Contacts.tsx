// src/pages/Contacts.tsx
import { Heading, Box } from "@chakra-ui/react";
import ContactForm from "../components/contact/ContactForm";
import { useContactForm } from "../hooks/useContactForm";

function Contacts() {
  const { values, submitting, success, error, onChange, submit } =
    useContactForm();

  return (
    <Box>
      <Heading mb={6}>お問い合わせ</Heading>

      <ContactForm
        values={values}
        submitting={submitting}
        success={success}
        error={error}
        onChange={onChange}
        onSubmit={submit}
      />
    </Box>
  );
}

export default Contacts;
