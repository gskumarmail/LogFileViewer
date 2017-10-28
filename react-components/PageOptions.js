/**
 * PageOptions: A Component that handles to display at maximum number lines
 * Default lines 10, It can be changed from user upto 50 lines
 * Creating drop down element to handle page lines
 * @author Senthilkumar G
 */

const LABEL_TEXT_1 = 'Display at maximum ';
const LABEL_TEXT_2 = ' lines';
const TEXT_COLOR = '#26a1ae';

class PageOptions extends React.Component {
    render() {
        return (
            React.createElement("div", { className: "col-md-6", style: { textAlign: 'right', color: TEXT_COLOR } },
                LABEL_TEXT_1,
                React.createElement("select", { onChange: this.props.onChange, name: "row_count" },
                    React.createElement("option", { value: "10" }, 10),
                    React.createElement("option", { value: "20" }, 20),
                    React.createElement("option", { value: "30" }, 30),
                    React.createElement("option", { value: "40" }, 40),
                    React.createElement("option", { value: "50" }, 50)
                ), LABEL_TEXT_2
            )
        );
    }
}