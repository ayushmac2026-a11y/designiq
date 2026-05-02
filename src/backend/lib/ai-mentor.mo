import Text "mo:core/Text";
import Char "mo:core/Char";

module {
  /// Returns the system prompt for the AI Mentor focused on design entrance exams.
  public func systemPrompt() : Text {
    "You are DesignIQ AI Mentor, an expert assistant specializing in UCEED, NID, and NIFT design entrance exams. Help students with exam patterns, preparation strategies, design concepts, portfolio tips, and practice questions. Be concise, encouraging, and accurate.";
  };

  /// Builds the JSON request body for an OpenAI-compatible API call.
  public func buildRequestBody(question : Text) : Text {
    let sys = systemPrompt();
    "{"
    # "\"model\":\"gpt-3.5-turbo\","
    # "\"messages\":["
    #   "{\"role\":\"system\",\"content\":\"" # escapeJson(sys) # "\"},"
    #   "{\"role\":\"user\",\"content\":\"" # escapeJson(question) # "\"}"
    # "],"
    # "\"max_tokens\":512,"
    # "\"temperature\":0.7"
    # "}";
  };

  /// Extracts the assistant reply text from an OpenAI-compatible JSON response.
  /// Falls back to a friendly message on parse failure.
  public func parseResponseBody(body : Text) : Text {
    // Split on the "content":" marker to find the reply
    let parts = body.split(#text("\"content\":\"")).toArray();
    if (parts.size() < 2) {
      "I'm sorry, I couldn't process your question right now. Please try again shortly."
    } else {
      // Take the second part and cut at the next unescaped double-quote
      let afterMarker = parts[1];
      let segments = afterMarker.split(#text("\"")).toArray();
      if (segments.size() == 0) {
        "I'm sorry, I couldn't process your question right now. Please try again shortly."
      } else {
        unescapeJson(segments[0])
      };
    };
  };

  /// Minimally escapes a string for embedding in a JSON string value.
  public func escapeJson(s : Text) : Text {
    var result = "";
    for (c in s.chars()) {
      let n = c.toNat32();
      if (n == 34) { result #= "\\\"" }       // double-quote
      else if (c == '\\') { result #= "\\\\" }
      else if (c == '\n') { result #= "\\n" }
      else if (c == '\r') { result #= "\\r" }
      else if (c == '\t') { result #= "\\t" }
      else { result #= Text.fromChar(c) };
    };
    result;
  };

  /// Minimally unescapes common JSON escape sequences in a string value.
  public func unescapeJson(s : Text) : Text {
    var result = "";
    var i = 0;
    let chars = s.toArray();
    let len = chars.size();
    while (i < len) {
      if (chars[i] == '\\' and i + 1 < len) {
        let next = chars[i + 1];
        if (next == 'n') { result #= "\n"; i := i + 2 }
        else if (next == 'r') { result #= "\r"; i := i + 2 }
        else if (next == 't') { result #= "\t"; i := i + 2 }
        else if (next.toNat32() == 34) { result #= "\""; i := i + 2 } // double-quote
        else if (next == '\\') { result #= "\\"; i := i + 2 }
        else { result #= Text.fromChar(chars[i]); i := i + 1 };
      } else {
        result #= Text.fromChar(chars[i]);
        i := i + 1;
      };
    };
    result;
  };
};
