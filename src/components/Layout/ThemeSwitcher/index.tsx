import { Button, useColorMode } from "@chakra-ui/react";
import { IoMdMoon } from "@react-icons/all-files/io/IoMdMoon";
import { IoMdSunny } from "@react-icons/all-files/io/IoMdSunny";

export const ThemeSwitcher: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} variant={"outline"}>
      {colorMode === "light" ? <IoMdMoon /> : <IoMdSunny />}
    </Button>
  );
};
