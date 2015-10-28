var panel_layout;
var panel_pin_item_layout='\
\
                <tr class="pin_item">\
                    <td>{{PIN_NAME}}</td>\
                    <td>\
                        <input type="text" name="{{PIN_NAME}}" class="form-control" value="" data-pin="{{PIN_VAL}}">\
                    </td>\
                </tr>\
';
var textarea_placeholder = '// Click `Generate`, and results will show here.';

$(document).ready(function(){
    panel_layout = $('.panel-layout').html(); $('.panel-layout').remove();
    $('.board_model').text(conf.board);
    $('.ios_value').text(conf.iostd);
    showPins();
});

function showPins() {
    for( var key in pins ) {
        if( pins.hasOwnProperty(key) ) {
            //Generate panel.
            var obj = pins[key];
            var panel = panel_layout;
            panel = panel.replace(/{{PIN_TYPE}}/g, key);
            $('#accordion').append(panel);
            addPinItem(obj, key);
        }
    }
}

function addPinItem(obj, key){
    if($.isArray(obj)) {
        //no pin_name specified
        obj.forEach(function(val, idx){
            var pin_name = key+idx;
            var pin_item = panel_pin_item_layout;
            pin_item = pin_item.replace(/{{PIN_NAME}}/g, pin_name);
            pin_item = pin_item.replace(/{{PIN_VAL}}/g, val);
            $('#collapse'+key).find('tbody').append(pin_item);
        });
    } else {
        //with pin_name specified
        for( var pin_name in obj ) {
            if(obj.hasOwnProperty(pin_name)) {
                var val = obj[pin_name];
                var pin_item = panel_pin_item_layout;
                pin_item = pin_item.replace(/{{PIN_NAME}}/g, pin_name);
                pin_item = pin_item.replace(/{{PIN_VAL}}/g, val);
                $('#collapse'+key).find('tbody').append(pin_item);
            }
        }
    }
}

function genUcf() {
    var r = '';
    $('input').each(function(){
        var val = $(this).val();
        var pin = $(this).attr('data-pin');
        if(val!=''){
            r += 'NET '+val+' ';
            if(conf.iostd) {
                r += 'IOSTANDARD = '+conf.iostd+' | ';
            }
            r += 'LOC = '+pin
            r += ';\n';
        }
    });
    if(!r) {
        $('textarea').text('// Empty input');
    } else {
        $('textarea').text(r);
    }
}

function clearUcf() {
    if( confirm('Are you sure you want to clear UCF?') ) {
        $('input').val('');
        $('textarea').text(textarea_placeholder);
    }
}
