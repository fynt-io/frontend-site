import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
  relativeSize?: boolean;
  totalStrengthScore?: number;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  relativeSize = false,
  totalStrengthScore,
}) => {
  // Verifica se a senha tem 10 dígitos ou mais
  const hasMinLength = password.length >= 10;
  const minLengthScore = hasMinLength ? 40 : 0;

  // Verifica se a senha contém letras
  const hasLetters = /[a-zA-Z]/.test(password);
  const lettersScore = hasLetters ? 15 : 0;

  // Verifica se a senha contém números
  const hasNumbers = /\d/.test(password);
  const numbersScore = hasNumbers ? 15 : 0;

  // Verifica se a senha contém caracteres especiais
  const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  const specialCharsScore = hasSpecialChars ? 15 : 0;

  // Verifica se a senha contém letras maiúsculas
  const hasUppercase = /[A-Z]/.test(password);
  const uppercaseScore = hasUppercase ? 15 : 0;

  // Calcula a pontuação total
  const totalScore =
    minLengthScore +
    lettersScore +
    numbersScore +
    specialCharsScore +
    uppercaseScore;

  // Define a força da senha com base na pontuação total
  let strength = "Fraca";
  let colorBar = "red";
  if (totalScore >= 50 && totalScore <= 60) {
    strength = "Média";
    colorBar = "#ffa500";
  } else if (totalScore >= 61 && totalScore <= 90) {
    strength = "Forte";
    colorBar = "green";
  } else if (totalScore > 90) {
    strength = "Fantástica";
    colorBar = "green";
  }

  totalStrengthScore = totalScore;

  return !relativeSize ? (
    <div className="mb-[2vh] flex justify-center items-center border p-[1.5vh_2vh] rounded-[2vh]  border-cloudy-blue  dark:border-medium-grey h-[2.2vw]">
      <div className="mr-[1vh] items-center justofy-center rounded-full overflow-hidden bg-cloudy-blue/50 dark:bg-cloudy-blue/10 h-[1.3vh] relative w-[8vw]">
        <div
          className={`rounded-full h-full `}
          style={{
            width: totalScore + "%",
            backgroundColor: colorBar,
            transition: "0.2s",
          }}
        ></div>
      </div>
      {/* <progress className="rounded-full" max="100" value={totalScore}></progress> */}
      {totalScore > 0 && (
        <p className="loadComponent">
          Senha <span className="font-semibold">{strength}</span>
        </p>
      )}
    </div>
  ) : (
    <div className="mb-10 flex justify-center items-center border p-[15px_25px] h-[55px] rounded-[15px]  border-cloudy-blue dark:border-medium-grey">
      <div className="mr-[10px] items-center justofy-center rounded-full overflow-hidden bg-cloudy-blue/50 dark:bg-cloudy-blue/10 h-[15px] relative w-[130px]">
        <div
          className={`rounded-full h-full `}
          style={{
            width: totalScore + "%",
            backgroundColor: colorBar,
            transition: "0.2s",
          }}
        ></div>
      </div>
      {/* <progress className="rounded-full" max="100" value={totalScore}></progress> */}
      {totalScore > 0 && (
        <p className="loadComponent w-full">
          Senha <span className="font-semibold">{strength}</span>
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
