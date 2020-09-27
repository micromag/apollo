export function packLogic(field, index, filteredFields, data) {

    console.log(`${field.name} logic.ts fired`)

    const unitValue = data.unit;

    if (unitValue !== "Pack"){
        field.visible = false;
        delete data[field.name];
    }
    else {
        field.visible = true;
    }
}

export function palletLogic(field, index, filteredFields, data) {

    console.log(`${field.name} logic.ts fired`)

    const unitValue = data.unit;

    if (unitValue !== "Pallet"){
        field.visible = false;
        delete data[field.name];
    }
    else {
        field.visible = true;
    }
}
