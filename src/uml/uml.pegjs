{
  function mapByIndex(seq, index) {
    return seq.map(function (v) { return v[index]; });
  };
}

Start = Header d:Diagram Footer { return d; } / Diagram

// Common
EOF = !. { return ''; }
SP = ' ' / '\t'
Newline = '\n' / c1:'\r' c2:'\n'? { return c1 + c2 || ''; }
Endline = Newline / EOF
Emptyline = SP* Newline
Blanklines = (SP* Newline &(SP* Endline))* SP* Endline
NotSpace = !SP !Newline c:. { return c; }
NotNewline = !Newline c:. { return c; }
Rawline = raw:(!Newline .)* nl:Newline { return mapByIndex(raw, 1).join('') + nl; }
DoubleQuote = '"' / '\u201c' / '\u201d' / '\u00ab' / '\u00bb'
DoubleQuotedString = DoubleQuote vs:(!DoubleQuote NotNewline)+ DoubleQuote {
  return mapByIndex(vs, 1).join('');
}
AlphaNumericAscii = [A-Za-z0-9]
Quote = "'" / '\u2018' / '\u2019'

Header = Emptyline* SP* '@startuml' Emptyline
Footer = SP* '@enduml' Blanklines?
Diagram = children:Entity* {
  return { type: 'diagram', children: children };
}

Entity = Emptyline* e:(Title / Caption / Link / Package / Namespace / Comment) Blanklines? { return e; }

Title = MultilineTitle / SinglelineTitle
SinglelineTitle = 'title' (SP* ':' SP* / SP+) &(SP* NotSpace) cs:NotNewline+ {
  return { type: 'title', value: cs.join('').replace('\\n', '\n') };
}
MultilineTitleBegin = 'title' Emptyline
MultilineTitleEnd = 'end' SP+ 'title'
MultilineTitle = MultilineTitleBegin vs:(!MultilineTitleEnd .)+ MultilineTitleEnd {
  return {
    type: 'title',
    value: mapByIndex(vs, 1).join('').replace('\\n', '\n'),
  };
}

Caption = 'caption' (SP* ':' SP* / SP+) &(SP* NotSpace) cs:NotNewline+ {
  return { type: 'caption', value: cs.join('').replace('\\n', '\n') };
}

LinkSeparator = ('.' / '::' / '\\' / '\\\\' )
LinkIdentifierKeywords = 'interface' / 'enum' / 'annotation' /
  'abstract' SP+ 'class'/ 'abstract' / 'class' / 'object' / 'entity'

LinkIdentifier = NonQuotedLinkIdentifier / DoubleQuotedString
NonQuotedLinkIdentifier = LinkSeparator? AlphaNumericAscii+ (LinkSeparator AlphaNumericAscii+)* {
  return text();
}
LinkLabel = SP* ':' SP* cs:NotNewline+ { return cs.join(''); }
Link =
  SP*
  lhs:LinkIdentifier
  SP*
  line:('-'+ / '.'+ / '='+)
  SP*
  rhs:LinkIdentifier
  label:LinkLabel?
{
  return {
    type: 'link',
    left: {
      name: lhs,
    },
    right: {
      name: rhs,
    },
    label: label,
  };
}

StereoType = '<<' cs:(!'>>' NotNewline)+ '>>' {
  return mapByIndex(cs, 1).join('');
}

PackageName = vs:[^# {}]+ { return vs.join(''); } / DoubleQuotedString;
Package =
  SP* 'package' SP+ name:PackageName? SP* stereoType:StereoType? SP* '{' Emptyline
  children:Entity* Blanklines?
  SP* '}' {
  return {
    type: 'package',
    name: name,
    stereoType: stereoType,
    children: children,
  };
}

NamespaceName = h:[A-Za-z0-9_] t:[A-Za-z0-9_.:\\]* { return h + t.join(''); }
Namespace =
  SP* 'namespace' SP+ name:NamespaceName SP* stereoType:StereoType? SP* '{' Emptyline
  children:Entity* Blanklines?
  SP* '}' {
  return {
    type: 'namespace',
    name: name,
    stereoType: stereoType,
    children: children,
  };
}

Comment = MultilineComment / SinglelineComment
SinglelineComment = SP* Quote SP* cs:NotNewline+ {
  return { type: 'comment', value: cs.join('') };
}
MultilineCommentBegin = SP* '/' Quote
MultilineCommentEnd = Quote '/'
MultilineComment = MultilineCommentBegin vs:(!MultilineCommentEnd .)+ MultilineCommentEnd {
  return {
    type: 'comment',
    value: mapByIndex(vs, 1).join('').replace('\\n', '\n'),
  };
}
