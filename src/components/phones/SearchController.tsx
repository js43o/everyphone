import styled from '@emotion/styled';
import SectionBlock from 'components/common/SectionBlock';

const ControllerBlock = styled(SectionBlock)`
  flex-direction: column;
  height: min-content;
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  hr {
    margin-top: 1rem;
    margin-bottom: 0;
  }
`;

export default function SearchController() {
  return (
    <ControllerBlock>
      <h3>제조사</h3>
      <form>
        <label>
          <input type="checkbox" name="manufacturer" value="apple" /> 삼성
        </label>
        <label>
          <input type="checkbox" name="manufacturer" value="apple" /> 애플
        </label>
        <label>
          <input type="checkbox" name="manufacturer" value="google" /> 구글
        </label>
      </form>
      <hr />
      <h3>화면 크기</h3>
      <form>
        <label>
          <input type="checkbox" name="display" value="small" /> 소형 (149 mm
          이하)
        </label>
        <label>
          <input type="checkbox" name="display" value="midium" /> 중형 (150 mm ~
          179 mm)
        </label>
        <label>
          <input type="checkbox" name="display" value="large" /> 대형 (180 mm
          이상)
        </label>
      </form>
      <hr />
      <h3>저장 용량</h3>
      <form>
        <label>
          <input type="checkbox" name="storage" value="small" /> 256GB 미만
        </label>
        <label>
          <input type="checkbox" name="storage" value="midium" /> 256GB ~ 512GB
        </label>
        <label>
          <input type="checkbox" name="storage" value="large" /> 512GB 초과
        </label>
      </form>
      <hr />
      <h3>배터리</h3>
      <form>
        <label>
          <input type="checkbox" name="battery" value="small" /> 3500 mAh 미만
        </label>
        <label>
          <input type="checkbox" name="battery" value="midium" /> 3500 mAh ~
          4500 mAh
        </label>
        <label>
          <input type="checkbox" name="battery" value="large" /> 4500 mAh 초과
        </label>
      </form>
      <hr />
    </ControllerBlock>
  );
}
