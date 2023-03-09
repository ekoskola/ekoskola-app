# Libre Office Macro

Use the macro and in the column the formula:

```vb
=CELL_URL(SHEET(),ROW(A2),COLUMN(BH:BH))
```

```vb
REM  *****  BASIC  *****
Function CELL_NOTE(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_NOTE = v.Annotation.getText.getString
   else
      CELL_NOTE = v
   endif
End Function
Function CELL_WORDCOUNT(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_WORDCOUNT = hotcount(v)
   else
      CELL_WORDCOUNT = v
   endif
End Function
REM an array function, useful for indirect addressing of sheets by position
REM returns a horizontal array of all sheet-names(vertical {=TRANSPOSE(SHEETLIST())}
REM Name of first sheet =INDEX(SHEETLIST();1;1). Row-index is always 1.
Function SHEETLIST()
   SHEETLIST = thisComponent.getSheets.getElementNames()
End Function
Function CELL_COLOR(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_COLOR = v.CellBackColor
   else
      CELL_COLOR = v
   endif
End Function
Function CELL_VISIBLE(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_VISIBLE = Abs(v.Rows.isVisible)
   else
      CELL_VISIBLE = v
   endif
End Function
Function CELL_LOCKED(vSheet,lRowIndex&,iColIndex%)as integer
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_LOCKED = Abs(v.CellProtection.isLocked)
   else
      CELL_LOCKED = v
   endif
End Function
REM get URL of N th text-hyperlink from a cell, default N=1)
Function CELL_URL(vSheet,lRowIndex&,iColIndex%,optional n%)
Dim v
   If isMissing(n) then n = 1
   If n < 1 then
      REM prints #VALUE to the cell:
      CELL_URL = Null
      exit function
   End If
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      if v.Textfields.Count >= n  then
         CELL_URL = v.getTextfields.getByIndex(n-1).URL
      else
         Cell_URL = ""
      endif
   else
      CELL_URL = v
   endif
End Function
REM get unlocalized (english) formula
Function CELL_FORMULA(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_FORMULA = v.getFormula()
   else
      CELL_FORMULA = v
   endif
End Function
'Split by line breaks
'=CELL_PARA(SHEET(),1,1,2) -> second paragraph of A1 in this sheet
Function CELL_PARA(vSheet,lRowIndex&,iColIndex%,optional n)
Dim v,s$,a(),i%
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      s = v.getString
      if not isMissing(n) then i = cInt(n)
      if i > 0 then
         a() = Split(s,chr(10))
         If (i <= uBound(a())+1)then
            CELL_PARA = a(i -1)
         else
            CELL_PARA = NULL
         endif
      else
         CELL_PARA = s
      endif
   else
      CELL_PARA = v
   endif
end Function
REM get value of a cell by it's position in workbook
REM this is useful if you want to get a cell-value from another sheet by the sheet's position
Function CELL_VALUE(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_VALUE = getCellValue(v)
   else
      CELL_VALUE = v
   endif
End Function
'return localized name of cell-style
Function CELL_STYLE(vSheet,lRowIndex&,iColIndex%)
Dim v,sDN$
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      sDN = thisComponent.StyleFamilies("CellStyles").getByName(v.CellStyle).DisplayName
      CELL_STYLE = sDN
   else
      CELL_STYLE = v
   endif
End Function
'return a com.sun.star.table.CellContentType
Function CELL_getType(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_getType = v.getType
   else
      CELL_getType = v
   endif
End Function
'returns a com.sun.star.sheet.CellFlags
Function CELL_FormulaResultType(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_FormulaResultType = v.FormulaResultType
   else
      CELL_FormulaResultType = v
   endif
End Function
'return the numberformat-index
Function CELL_NumberFormat(vSheet,lRowIndex&,iColIndex%)
Dim v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_NumberFormat = v.NumberFormat
   else
      CELL_NumberFormat = v
   endif
End Function
'return a com.sun.star.util.NumberFormat
Function CELL_NumberFormatType(vSheet,lRowIndex&,iColIndex%)
Dim v,lNF&
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      lNF = v.NumberFormat
      CELL_NumberFormatType = ThisComponent.getNumberFormats.getByKey(lNF).Type
   else
      CELL_NumberFormatType = v
   endif
End Function
'return a char-locale
Function CELL_Locale(vSheet,lRowIndex&,iColIndex%)
DIm v
   v = getSheetCell(vSheet,lRowIndex&,iColIndex%)
   if vartype(v) = 9 then
      CELL_Locale = getCharLocaleStringFromObj(v)
   else
      CELL_Locale = v
   endif
End Function
Function DOC_Locale()
   DOC_Locale = getCharLocaleStringFromObj(ThisComponent)
End Function
'Because most languages do not know variants, there is no simple "Cell.getValue"
Function getCellValue(oCell as com.sun.star.sheet.Cell) as variant
dim lContentType&,lResultType&,oDummy as Object
lContentType = oCell.getType
lResultType = oCell.FormulaResultType
If oCell.getError <> 0 then
   'return Null which gives err #VALUE when passed back to a sheet-cell
   getCellValue = oDummy
else
   with com.sun.star.table.CellContentType
   select case lContentType
      case is = .FORMULA
      If lResultType = com.sun.star.sheet.FormulaResult.VALUE then
         getCellValue = oCell.getValue '
      else lResultType = com.sun.star.sheet.FormulaResult.STRING
         getCellValue = oCell.getString
      'no way_ http://www.openoffice.org/issues/show_bug.cgi?id=58749
      'elseIf lResultType = com.sun.star.sheet.ERROR then
      '   getCellValue = oCell.getError
      end if
   case is = .VALUE
      getCellValue = oCell.getValue
   case is = .TEXT
      getCellValue = oCell.getString
   case is = .EMPTY
   'default variant empty
   end select
   end with
end if
end function
REM Helpers for above sheet functions. Get cell from sheet's name or
REM position; cell's row-position; cell's col-position
Function getSheetCell(byVal vSheet,byVal lRowIndex&,byVal iColIndex%)
dim oSheet
'   print vartype(vsheet)
   oSheet = getSheet(vSheet)
   if isNull(oSheet) then
      getSheetCell = NULL
   elseif (lRowIndex > oSheet.rows.count)OR(lRowIndex < 1) then
      getSheetCell = NULL
   elseif (iColIndex > oSheet.columns.count)OR(iColIndex < 1) then
      getSheetCell = NULL
   else
      getSheetCell = oSheet.getCellByPosition(iColIndex -1,lRowIndex -1)
   endif
End Function
Function getSheet(byVal vSheet)
on error goto exitErr
   select case varType(vSheet)
   case is = 8
      if thisComponent.sheets.hasbyName(vSheet) then
         getSheet = thisComponent.sheets.getByName(vSheet)
      else
         getSheet = NULL
      endif
   case 2 to 5
      vSheet = cInt(vSheet)
      'Wow! Calc has sheets with no name at index < 0,
      ' so NOT isNull(oSheet), if vSheet <= lbound(sheets) and CRASH!
      'http://www.openoffice.org/issues/show_bug.cgi?id=58796
      if(vSheet <= thisComponent.sheets.count)AND(vSheet > 0) then
         getSheet = thisComponent.sheets.getByIndex(vSheet -1)
      else
         getSheet = NULL
      endif
   end select
exit function
exitErr:
getSheet = NULL
End Function
Function getCharLocaleStringFromObj(oObj) as String
Dim s$
   with oObj.CharLocale
      s = .Language
      s = s &"_"& .Country
      if .Variant <>"" then s = s &"_"& .Variant
   End With
   getCharLocaleStringFromObj = s
End Function

'stolen from http://www.oooforum.org/forum/viewtopic.phtml?t=13214
' and modified so it takes a cell as parameter and gets the locale from the char-locale of that cell
function hotcount(oCell)
' the ultimate, using the same breakiterator as the program
dim aString$
dim mystartpos as long
dim numwords%,nw%
dim nextwd as new com.sun.star.i18n.Boundary
dim aLocale as new com.sun.star.lang.Locale
aString = oCell.getString
aLocale = oCell.CharLocale
numwords=1 ' don't ask me why we need this
mystartpos=0
brk=createUnoService("com.sun.star.i18n.BreakIterator")
nextwd=brk.nextWord(aString,startpos,aLocale,com.sun.star.i18n.WordType.WORD_COUNT)
Do while nextwd.startPos <> nextwd.endPos
   numwords=numwords+1
   nw=nextwd.startPos
   nextwd=brk.nextWord(aString,nw,aLocale,com.sun.star.i18n.WordType.WORD_COUNT)
Loop
hotcount=numwords
end Function

Sub Macro1

End Sub
```
