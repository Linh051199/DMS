import {useVisibilityControl} from "@packages/hooks";
import {GroupHeader} from "@packages/ui/group-header";
import Form, {SimpleItem} from "devextreme-react/form";

export interface GroupFieldProps {
    item: any;
    formData: any;
    disableCollapsible?: boolean;
    visiableHeader?: boolean;
    readOnly?: boolean;
}

export const GroupField = ({
                               item,
                               formData,
                               disableCollapsible,
                               visiableHeader,
                               readOnly = true
                           }: GroupFieldProps) => {
    const control = useVisibilityControl({defaultVisible: true});
    return (
        <div className={"form-group"}>
            <GroupHeader
                visiableHeader={visiableHeader}
                caption={item.caption}
                control={control}
                disableCollapsible={disableCollapsible}
            />
            <Form
                visible={control.visible}
                className={control.visible ? "normal-content" : "collapsible-content"}
                readOnly={readOnly}
                formData={formData}
                colCount={2}
            >
                {item.items?.map((subItem: any, subIndex: number) => {
                    return <SimpleItem {...subItem} key={subIndex}/>;
                })}
            </Form>
        </div>
    );
};
