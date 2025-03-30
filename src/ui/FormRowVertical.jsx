import styled from "styled-components";

const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function FormRowVertical({ label, children, error }) {
  return (
    <StyledFormRowVertical>
      <Label htmlFor={children.props?.id}>{label}</Label>
      {children}
      {error && error !== "" && <Error>{error}</Error>}{" "}
    </StyledFormRowVertical>
  );
}

export default FormRowVertical;
