pragma solidity ^0.8.0;


function parseInt(string memory _str) pure returns (uint) {
    bytes memory bstr = bytes(_str);
    uint uintVal = 0;
    for (uint i = 0; i < bstr.length; i++) {
        uint digit = uint(uint8(bstr[i]));
        if (digit >= 48 && digit <= 57) {
            uintVal = uintVal * 10 + (digit - 48);
        }
    }
    return uintVal;
}


function replace(string memory _str, string memory _find, string memory _replace) pure returns (string memory) {
    bytes memory bstr = bytes(_str);
    bytes memory bfind = bytes(_find);
    bytes memory breplace = bytes(_replace);

    uint findLen = bfind.length;
    uint replaceLen = breplace.length;
    uint diff = replaceLen - findLen;
    uint i = 0;
    while (i <= bstr.length - findLen) {
        bool matched = true;
        for (uint j = 0; j < findLen; j++) {
            if (bstr[i+j] != bfind[j]) {
                matched = false;
                break;
            }
        }
        if (matched) {
            bytes memory btemp = new bytes(bstr.length + diff);
            uint k = 0;
            for (uint j = 0; j < i; j++) {
                btemp[k++] = bstr[j];
            }
            for (uint j = 0; j < replaceLen; j++) {
                btemp[k++] = breplace[j];
            }
            for (uint j = i + findLen; j < bstr.length; j++) {
                btemp[k++] = bstr[j];
            }
            bstr = btemp;
            i += replaceLen;
        } else {
            i++;
        }
    }
    return string(bstr);
}

function getFileValue(bytes memory file, mapping(bytes1 => uint8) storage fileValue) returns (uint8) {
    bytes1 fileByte = file[0];
    return fileValue[fileByte];
}

function expandSubFen(bytes memory subStringFen) returns (bytes[] memory) {
    bytes[] memory subFen = new bytes[](subStringFen.length);
    bytes1 one = '1';

    for (uint8 i = 0; i < subStringFen.length; i++) {
        if (subStringFen[i] >= '0' && subStringFen[i] <= '9') {
            uint8 emptyAmount = uint8(subStringFen[i] - '0');
            subFen[i] = bytes(one.toString()[31:31-emptyAmount+1]);
        } else {
            subFen[i] = subStringFen[i];
        }
    }

    return subFen;
}

function condenseSubFen(bytes memory subFenlst) returns (bytes memory) {
    bytes memory newSubFen = "";
    uint256 count = 0;

    for (uint256 i = 0; i < subFenlst.length; i++) {
        if (subFenlst[i] == "1") {
            count++;
        } else if (count != 0) {
            newSubFen = abi.encodePacked(newSubFen, count.toString(), string(subFenlst[i]));
            count = 0;
        } else {
            newSubFen = abi.encodePacked(newSubFen, string(subFenlst[i]));
        }
    }

    if (count != 0) {
        newSubFen = abi.encodePacked(newSubFen, count.toString());
    }

    return newSubFen;
}

function updateFen(string memory from, string memory to, string memory fen)  {
    string[] memory fenArray = split(fen, " ")[0].toString().split("/");
    uint8 fromIndex = 8 - uint8(parseInt(substring(from, 1, 1)));
    string memory fromFen = fenArray[fromIndex];

    bytes memory fromFenBytes = bytes(fromFen);
    bytes[] memory fromFenExpanded = expandSubFen(fromFenBytes);

    uint8 fileValue = getFileValue(bytes(from), fileValue);
    bytes1 piece = fromFenExpanded[fileValue];

    fromFenExpanded[fileValue] = '1';

    uint8 toIndex = 8 - uint8(parseInt(substring(to, 1, 1)));
    bytes[] memory toFenExpanded;

    if (toIndex == fromIndex) {
        toFenExpanded = fromFenExpanded;
    } else {
        string memory toFen = fenArray[toIndex];
        bytes memory toFenBytes = bytes(toFen);
        toFenExpanded = expandSubFen(toFenBytes);
    }

    uint8 toFileValue = getFileValue(bytes(to), fileValue);
    toFenExpanded[toFileValue] = piece;

    bytes memory condensedFromFen = condenseSubFen(fromFenExpanded);
    bytes memory condensedToFen = condenseSubFen(toFenExpanded);

    fenArray[fromIndex] = string(condensedFromFen);
    fenArray[toIndex] = string(condensedToFen);

    string memory fenCopy = fen;
    
}