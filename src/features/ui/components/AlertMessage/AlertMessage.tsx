import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

export interface AlertMessageProps {
  status?: 'error' | 'info' | 'warning' | 'success' | 'loading' | undefined;
  title: string;
  children: React.ReactNode;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  status = 'error',
  title,
  children,
}) => {
  return (
    <Alert
      status={status}
      rounded="md"
      boxShadow="md"
      flexDirection="column"
      fontSize="sm"
      textAlign="center"
    >
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};
