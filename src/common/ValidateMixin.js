const DEFAULT_VALIDATORS = {
  'require': {
    fn(val) {
      return val !== null && val !== undefined && val !== '';
    },
    message(name) {
      return `${name}不能为空`;
    }
  },
  'email': {
    fn(val) {
      return /@/.test(val);
    },
    message: '邮箱格式不合法'
  },
  'minLength': {
    fn(val, min = 5) {
      return val.length >= min;
    },
    message(name, min = 5) {
      return `${name}长度不能少于 ${min}`;
    }
  },
  'password': {
    fn(val) {
      return /[a-z]/.test(val) && /[A-Z]/.test(val) && /\d/.test(val);
    },
    message: '密码必须同时包含大写字母, 小写字母和数字'
  }
};

function isFn(obj) {
  return typeof obj === 'function';
}

export default {
  validate(keyName, ...rules) {
    const {formData, formErrors} = this.state;
    const val = formData[keyName];
    let pass;
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const fieldName = rule.name || keyName;
      const params =  isFn(rule.params) ? rule.params.call(this) : (rule.params || []);
      const fn = isFn(rule.type) ? rule.type : DEFAULT_VALIDATORS[rule.type].fn;
      const msg = rule.message || DEFAULT_VALIDATORS[rule.type].message || `${fieldName} 校验失败`;
      pass = fn.apply(this, [val, ...params]);
      if (!pass) {
        formErrors[keyName] = isFn(msg) ? msg.apply(this, [fieldName, ...params]) : msg;
        break;
      }
    }
    if (pass) {
      formErrors[keyName] = false;
    }
    this.setState({
      formData,
      formErrors
    });
  },
  validateAll(breakWhenMeetFirst = false) {
    const {formRules} = this.state;
    let pass = true;
    for(const k in formRules) {
      if (!this.validate(k, ...formRules[k])) {
        pass = false;
      }
      if (breakWhenMeetFirst) {
        break;
      }
    }
    return pass;
  }
};