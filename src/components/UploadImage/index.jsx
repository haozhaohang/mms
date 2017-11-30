import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Upload, notification } from 'antd';
import { UPLOAD_FILE } from 'constants/api';

function getBasicName(url) {
    const arr = url.split('/');

    return arr[arr.length - 1];
}

class UploadImage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            unfinishedFile: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ file }) {
        const { onChange } = this.props;
        const { status, response } = file;

        switch (status) {
        case 'removed':
            onChange();
            this.setState({ unfinishedFile: null });
            break;
        case 'error':
            notification.error({
                message: '提示信息',
                description: '网络错误，请稍后重试'
            });
            this.setState({ unfinishedFile: null });
            break;
        case 'uploading':
            this.setState({
                unfinishedFile: file
            });
            break;
        case 'done':
            if (response.errno === 0) {
                onChange(response.data.file);
            } else {
                notification.error({
                    message: '提示信息',
                    description: response.msg
                });
            }

            this.setState({ unfinishedFile: null });
            break;
        default:
        }
    }

    render() {
        const { value, ...other } = this.props;
        const { unfinishedFile } = this.state;
        const file = unfinishedFile || (value ? {
            uid: -1,
            status: 'done',
            name: getBasicName(value),
            url: value
        } : null);

        const fileList = file ? [file] : [];

        /*
        注意:
        upload 添加 accept="image/*" 属性会导致在某些低性能电脑上打开上传窗口
        */
        return (
            <Upload
                {...other}
                name="file"
                listType="picture"
                action={UPLOAD_FILE}
                onChange={this.handleChange}
                fileList={fileList}
            >
                <Button>
                    <Icon type="upload" />                    点击上传
                </Button>
            </Upload>
        );
    }
}

UploadImage.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    optimize: PropTypes.bool
};

export default UploadImage;
