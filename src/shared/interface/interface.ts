export class Page {
    pageNumber = 1;
    pageSize = 10;
    sorts: Sort[];
}
export class Sort {
    colId: String;
    sort: String;
}

export class ComboBox {
    query: String;
    from: String;
    to: String;
    lang: String;
    currentValue: String;
    limit = 10;
}
export class PublicAnnounce {
    websiteCode: String;
    subjectCode: String;
    lang: String;
}
