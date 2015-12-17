/*
 * (c) Copyright Ascensio System SIA 2010-2016
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia,
 * EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
*/


Templates = (function() { 'use strict';

    var addConnectPanel = function(parentnode) {
        var _html = '<div id="box-empty-portals" class="empty">' +
                      '<h3 class="text-welcome">Take all advantages of ONLYOFFICE</h3>' +
                      '<h4 class="text-description">Log in to your portal and add you team members.</h4>' +
                      '<button class="btn primary login">Connect portal</button>' +
                      '<button class="btn">Create portal</button>' +
                    '</div>'+
                    '<div id="box-portals">' +
                    '</div>';

        $(parentnode).append(_html);
        addPortalsTable('#box-portals', 'Connected portals');
    };

    function makeFilesItem(info) {
        var _tpl = !!info.uid ? '<tr id=' + info.uid + '>' : '<tr>';
        _tpl += '<td class="row-cell cicon"><span class="icon %type" /></td>' +
                        '<td class="row-cell cname"><p class="name primary">%name</p><p class="descr minor">%descr</p></td>';
        if (info.type != 'folder') 
            _tpl += '<td class="row-cell cdate minor">%date</td>'.replace(/\%date/, info.date);

        return _tpl.replace(/\%name/, info.name)
                .replace(/\%type/, info.type)
                .replace(/\%descr/, info.descr);
    };

    function makePortalItem(info) {
        var _tpl = '<tr id="%id"><td class="row-cell cportal primary">%portal</td>' +
                        '<td class="row-cell cuser minor"><span>%user</span></td>' +
                        '<td class="row-cell cemail minor"><span>%email</span></td>' +
                        '<td class="cell-tools">'+
                          '<div class="hlayout">'+
                            '<button class="btn-quick logout"></button>'+
                          '</span>'+
                        '</td>';

        return _tpl.replace(/\%portal/, utils.skipUrlProtocol(info.portal))
                .replace(/\%user/, info.user)
                .replace(/\%email/, info.email)
                .replace(/\%id/, info.elid);
    };

    function addRecentFiles(opts) {
        opts.id&&(opts.id='id="'+opts.id+'"')||(opts.id='');

        let _html = '<div class="flexbox"><table class="table-files header">' +
                        '<caption>%caption</caption>';
        if (opts.coltitle === false) {
            _html += '<tr class="column-title hidden" height="12">' +
                            '<th class="cell-name" colspan="2"></th>' +
                            '<th class="cell-date"></th>' +
                        '</tr>';
        } else {
            _html += '<tr class="column-title">' +
                            '<th class="cell-name" colspan="2">Name</th>' +
                            '<th class="cell-date">Date</th>' +
                        '</tr>';
        }
        
        _html += '</table>'+                
                    '<div class="table-box flex-fill"><table %id class="table-files list">'+
                    '</div></table></div>';

        $(opts.holder).append(_html.replace(/\%caption/, opts.caption).replace(/\%id/, opts.id));
    };

    function addPortalsTable(holder, caption) {
        let _html = '<div class="flexbox"><table class="table-files header">' +
                        '<caption>%caption</caption>';

        _html += '<tr class="column-title hidden" height="12">' +
                    '<th class="cell-portal"></th>' +
                    '<th class="cell-user"></th>' +
                    '<th class="cell-email" colspan="2"></th>' +
                  '</tr>';
        
        _html += '</table>'+                
                    '<div class="table-box flex-fill"><table class="table-files list">'+
                    '</div></table>'+
                    '<div class="lst-tools"><button id="btn-addportal" class="btn login">Add portal</button></div>'+
                '</div>';

        $(holder).append(_html.replace(/\%caption/, caption));
    };

    return {
        addConnectPanel: addConnectPanel,
        insertFilesTable: addRecentFiles,
        produceFilesItem: makeFilesItem,
        producePortalItem: makePortalItem
    };
})();