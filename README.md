# HTMLEngine

t("div") // create a div element
t("div#id") // create and add id
t("div||#id.class1/class2") create andd id and class 1 and class 2
t("div",value) if value is a array strings if is a object update properties


t("div::property") get property
t("div::property",value) set property

t("#id") get by id
t(".class") get by class
t("q:#id > div") get by query
t("qAll:#id > div") ge by query all

t("$head") // get template
t({
    tag:"div"
}) // create by struct
