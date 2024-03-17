export type DropdownOption = { label: string; value: string };

export type DropdownProps = {
    onValueChange: (value: string) => void;
    items: DropdownOption[];
    value: string;
};
