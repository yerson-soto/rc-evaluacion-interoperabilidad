import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EvaluationService } from 'library/api/services/EvaluationService';
import { useNavigate } from 'react-router-dom';
import { paths } from 'library/common/constants';
import { message } from 'antd';
import { convertHTMLToText } from 'library/helpers/convert-html-text';

export function useFinishEvaluation() {
  const [isLoading, setLoading] = useState(false);
  const evaluationService = new EvaluationService();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const finishEvaluation = (uid: string) => {
    setLoading(true);
    
    evaluationService.finish(uid)
      .then(() => {
        setLoading(false);
        
        message.success(t("alerts.finish_evaluation_success"));
        navigate(paths.admin.evaluations.index);
      })
      .catch((errmesage) => {
        setLoading(false);
        
        // TODO: Change to i18n
        message.error(errmesage);
      })
  }

  const captureReportHTML = () => {
    const html = document.querySelector('html');
    const htmlText = convertHTMLToText(html, true);

    const mainEndTag = '</main>';
    const mainStart = htmlText.indexOf('<main');
    const mainEnd = htmlText.indexOf(mainEndTag);

    // Extrac main tag
    const mainHTMLText = htmlText.substring(mainStart, mainEnd+mainEndTag.length);

    const bodyStartTag = '<body';
    const bodyEndTag = '</body>';
    const bodyStart = htmlText.indexOf(bodyStartTag);
    const bodyEnd = htmlText.indexOf(bodyEndTag);

    // Create new html text with main
    let newHTMLText = htmlText.substring(0, bodyStart) 
      + '<body>' 
      + mainHTMLText 
      + '</body>' 
      + htmlText.substring(bodyEnd+bodyEndTag.length);

    // Remove ant card head
    const antCardHead = html?.querySelector('.ant-card-head');
    const antCardHeadText = convertHTMLToText(antCardHead, true);
    newHTMLText = newHTMLText.replace(antCardHeadText, '');

    // Remove ant tabs nav
    const antTabsHead = html?.querySelector('.ant-tabs-nav');
    const antTabsHeadText = convertHTMLToText(antTabsHead, true);
    newHTMLText = newHTMLText.replace(antTabsHeadText, '<br />');
    console.log(newHTMLText);
    return newHTMLText;
  }

  return { finishEvaluation, captureReportHTML, isLoading };
}

