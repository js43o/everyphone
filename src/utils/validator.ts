export const isNumber = (str: string) => /^\d*$/.test(str);

export const isRegularCharacter = (str: string) => /^[\wㄱ-힣]*$/.test(str);

export const hasNumber = (str: string) => /\d/.test(str);

export const hasKorean = (str: string) => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(str);

export const hasWord = (str: string) => /[a-zA-Zㄱ-힣]/.test(str);

export const hasWhitespace = (str: string) => /\s/.test(str);

export const hasSpecialCharacter = (str: string) => /[^\w\sㄱ-힣]/.test(str);

export const validateUsername = (str: string) => {
  if (!str || str.length > 10) {
    return '이름은 1자 이상 10자 이하여야 합니다.';
  }

  if (hasWhitespace(str)) {
    return '이름은 공백을 포함할 수 없습니다.';
  }

  if (!isRegularCharacter(str)) {
    return "이름은 영문, 한글, 숫자, '_'만 포함할 수 있습니다.";
  }

  return '';
};

export const validatePassword = (str: string) => {
  if (!str || str.length < 6 || str.length > 20) {
    return '패스워드는 6자 이상 20자 이하여야 합니다.';
  }

  if (hasWhitespace(str)) {
    return '패스워드는 공백을 포함할 수 없습니다.';
  }

  if (!hasNumber(str) || !hasWord(str) || !hasSpecialCharacter(str)) {
    return '패스워드는 최소 1개 이상의 문자, 숫자, 특수문자를 포함해야 합니다.';
  }

  return '';
};

export const validateCommentContents = (str: string) => {
  if (!str || str.length > 100) {
    return '댓글 내용은 100자 이내로 작성해 주세요.';
  }

  return '';
};
