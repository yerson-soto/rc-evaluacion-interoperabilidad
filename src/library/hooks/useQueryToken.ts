import { useLocation } from 'react-router-dom';
import { keys } from 'library/common/constants';

export function useQueryToken(): string {
  const location = useLocation();
  const paramName: string = keys.linkTokenParam,
    url: string = location.search,
    urlIncludesParam: boolean = url.includes(paramName);

  if (urlIncludesParam) {
    const paramStartIndex = url.indexOf(paramName);
    let splittedUrl = url.substring(paramStartIndex);
    const nextParamIndex = splittedUrl.indexOf('&');
    const nextParamExists = nextParamIndex !== -1;

    if (nextParamExists) {
      splittedUrl = splittedUrl.substring(0, nextParamIndex);
    }

    const paramValue = splittedUrl.replace(paramName + '=', '');
    return paramValue;
  }

  return '';
}
