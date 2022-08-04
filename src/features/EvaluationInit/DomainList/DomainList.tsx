import React from "react";
import { useTranslation } from "react-i18next";
import { Button, List, Typography, Card, Empty, Avatar } from "antd";
import { Progress, Grid, Popconfirm } from "antd";
import { Domain } from "library/models/Domain";
import { ListItem } from "library/components/ListItem";
import { PaginationFooter } from "library/components/PaginationFooter";
import { useDomainList } from "./useDomainList";
import { useMedia } from "use-media";

import classes from "./DomainList.module.css";
import { AppBox } from "library/components/AppBox";

const { useBreakpoint } = Grid;

// const domains: Domain[] = [
//   {
//     id: 1,
//     name: "Organizacional",
//     slug: 'organizacional'
//   },
//   {
//     id: 2,
//     name: "Semantico",
//     slug: 'semantico'
//   },
//   {
//     id: 3,
//     name: "Politico Legal",
//     slug: 'politico-legal'
//   },
//   {
//     id: 4,
//     name: "Semantico Legal",
//     slug: 'semantico-legal'
//   },
// ];

interface DomainListProps {
  onEvaluate: (domain: Domain) => void;
  onReset: (domain: Domain) => void;
}

export default function DomainList(props: DomainListProps) {
  const { onEvaluate, onReset } = props;
  const { isLoading, domains } = useDomainList();
  const { t } = useTranslation();

  const isSmall = useMedia({ maxWidth: 768 });
  console.log("small", isSmall);
  return (
    // <Card>
      <List
        loading={isLoading}
        dataSource={domains}
        grid={{ gutter: 16, column: 3, }}
        // itemLayout={isSmall ? "vertical" : "horizontal"}
        size="large"
        pagination={{
          pageSize: 10,
        }}
        locale={{
          emptyText: <Empty description={t("empty.domains")} />,
        }}
        footer={
          <PaginationFooter
            total={domains.length}
            label={t("pagination.domains")}
          />
        }
        style={{ maxWidth: '70%' }}
        renderItem={(domain) => (
          <List.Item onClick={() => onEvaluate(domain)}>
            <Card
              className={classes.itemCard}
              cover={
                <AppBox
                  style={{
                    height: "150px",
                    backgroundColor:" #0093E9",
                    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text
                    style={{
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {domain.name}
                  </Typography.Text>
                </AppBox>
              }
              bordered={false}
            >
              <List.Item.Meta
                avatar={
                <Avatar
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {domain.acronym}
                </Avatar>
                //  <Progress type="circle" width={35} percent={67} />
                // <Progress
                //   width={40}
                //   type="circle"
                //   // strokeColor={{
                //   //   '0%': '#d57418',
                //   //   '100%': '#339503',
                //   // }}
                //   format={() => "3.5"}
                //   percent={40}
                // />
              }
              title="2 preguntas completadas de 6"
              description={<Progress percent={30} />}
              // description={
              //   <Progress  percent={30} />
              // }
            />
              
            </Card>
          </List.Item>
          // <ListItem
          //   key={domain.id}
          //   className={classes.domain}
          //   actions={[
          //     <Button onClick={() => onEvaluate(domain)}>
          //       {t("buttons.evaluate")}
          //     </Button>,

          //     <Popconfirm
          //       title="Seguro que deseas restablecer este dominio?"
          //       onConfirm={() => {}}
          //       onCancel={() => {}}
          //       okText="Yes"
          //       cancelText="No"
          //     >
          //       <Button danger>Restablecer</Button>,
          //     </Popconfirm>,
          //   ]}
          // >
          //   <List.Item.Meta
          //     avatar={
          //       // <Avatar
          //       //   style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          //       // >
          //       //   3.6
          //       // </Avatar>
          //       //  <Progress type="circle" width={35} percent={67} />
          //       <Progress
          //         width={40}
          //         type="circle"
          //         // strokeColor={{
          //         //   '0%': '#d57418',
          //         //   '100%': '#339503',
          //         // }}
          //         format={() => "3.5"}
          //         percent={40}
          //       />
          //     }
          //     title={domain.name}
          //     description="reiciendis obcaecati earum, non commodi nihil corrupti "
          //     // description={
          //     //   <Progress  percent={30} />
          //     // }
          //   />
          //   <Typography.Text>
          //     La entidad ha logrado que la implementación de los lineamientos
          //     del Marco de Interoperabilidad del Estado sea un tema conocido a
          //     nivel institucional sin embargo no ha logrado involucrar a todos
          //     los interesados.
          //   </Typography.Text>
          // </ListItem>
        )}
      />
    // </Card>
  );
}
// export default function DomainList(props: DomainListProps) {
//   const { onEvaluate, onReset } = props;
//   const { isLoading, domains } = useDomainList();
//   const { t } = useTranslation();

//   const isSmall = useMedia({ maxWidth: 768 });
//   console.log("small", isSmall);
//   return (
//     <Card>
//       <List
//         loading={isLoading}
//         dataSource={domains}
//         itemLayout={isSmall ? "vertical" : "horizontal"}
//         size="large"
//         pagination={{
//           pageSize: 10,
//         }}
//         locale={{
//           emptyText: <Empty description={t("empty.domains")} />,
//         }}
//         footer={
//           <PaginationFooter
//             total={domains.length}
//             label={t("pagination.domains")}
//           />
//         }
//         renderItem={(domain) => (
//           <ListItem
//             key={domain.id}
//             className={classes.domain}
//             actions={[
//               <Button onClick={() => onEvaluate(domain)}>
//                 {t("buttons.evaluate")}
//               </Button>,

//               <Popconfirm
//                 title="Seguro que deseas restablecer este dominio?"
//                 onConfirm={() => {}}
//                 onCancel={() => {}}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <Button danger>Restablecer</Button>,
//               </Popconfirm>,
//             ]}
//           >
//             <List.Item.Meta
//               avatar={
//                 // <Avatar
//                 //   style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
//                 // >
//                 //   3.6
//                 // </Avatar>
//                 //  <Progress type="circle" width={35} percent={67} />
//                 <Progress
//                   width={40}
//                   type="circle"
//                   // strokeColor={{
//                   //   '0%': '#d57418',
//                   //   '100%': '#339503',
//                   // }}
//                   format={() => "3.5"}
//                   percent={40}
//                 />
//               }
//               title={domain.name}
//               description="reiciendis obcaecati earum, non commodi nihil corrupti "
//               // description={
//               //   <Progress  percent={30} />
//               // }
//             />
//             <Typography.Text>
//               La entidad ha logrado que la implementación de los lineamientos
//               del Marco de Interoperabilidad del Estado sea un tema conocido a
//               nivel institucional sin embargo no ha logrado involucrar a todos
//               los interesados.
//             </Typography.Text>
//           </ListItem>
//         )}
//       />
//     </Card>
//   );
// }
