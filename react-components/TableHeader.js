/**
 * Header: A Component that handles the table header section
 * Two calumns are S.No and Log File : path / name will be displayed
 * @author Senthilkumar G
 */

class TableHeader extends React.Component {
    render () {
        return (
            React.createElement("thead", null, 
                React.createElement("tr", null, 
                this.props.data.columns.map(function (column, i) {
                    return React.createElement(TableHeaderCell, 
                                                {
                                                    key: i,
                                                    column: column
                                                })
                })
                )
            )
        );
    }
}

/**
 * TableHeaderCell: A Child component that handles to create header element <th>
 * Two calumns are S.No and Log File : path / name will be displayed
 * @return colums
 */

class TableHeaderCell extends React.Component {
    render() {
        const th_column_width = (this.props.column.key === 'No') ? '10%' : '90%';
        const th_textAlign = (this.props.column.key === 'No') ? 'center' : 'left';
        return (
            React.createElement("th", 
                                {
                                    className: "", 
                                    style:{textAlign:th_textAlign, width:th_column_width}},
                                    this.props.column.label
                                )
        );
    }
}
