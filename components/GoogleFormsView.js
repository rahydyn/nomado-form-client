export const GoogleFormsView = ({ formsContent }) => {
  const items = formsContent.data.items;
  return (
    <>
      <div>Registerd Google Forms</div>
      <div>
        <span>Form ID : </span>
        <span>{formsContent.data.formId}</span>
      </div>
      <div>
        <span>Title : </span>
        <span>{formsContent.data.info.documentTitle}</span>
      </div>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <span>Question {index+1}. : </span>
            <span>{item.title}</span>
          </div>
        );
      })}
    </>
  );
};