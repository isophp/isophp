/**
 * Created by liushuai on 2018/2/9.
 */
import { Input, Icon } from 'antd';

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
        lastValue: this.props.value
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value, this.checkSuccess.bind(this), this.checkFail.bind(this));
        }
    };
    checkSuccess()
    {
        this.setState({
            lastValue: this.state.value
        });
    }
    checkFail()
    {
        this.setState({
            value: this.state.lastValue
        });
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}
export default EditableCell;