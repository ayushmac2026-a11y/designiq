import AIMentorLib "../lib/ai-mentor";
import Text "mo:core/Text";

/// AI Mentor mixin — exposes the public askAIMentor endpoint.
/// Uses IC management canister http_request (http-outcalls) to call an
/// external OpenAI-compatible AI service and return answers to student
/// questions about UCEED, NID, and NIFT design entrance exams.
mixin () {
  // IC management canister actor reference for http_request
  let ic = actor "aaaaa-aa" : actor {
    http_request : ({
      url : Text;
      max_response_bytes : ?Nat64;
      method : { #get; #head; #post };
      headers : [{ name : Text; value : Text }];
      body : ?Blob;
      transform : ?{
        function : shared query ({ response : { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob }; context : Blob }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
        context : Blob;
      };
      is_replicated : ?Bool;
    }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
  };

  /// Ask the AI Mentor any question about UCEED, NID, or NIFT exams.
  /// Returns the AI's plain-text answer, or a user-friendly error message.
  public func askAIMentor(question : Text) : async Text {
    if (question.size() == 0) {
      return "Please ask a question about UCEED, NID, or NIFT exams.";
    };

    let requestBody = AIMentorLib.buildRequestBody(question);
    let bodyBlob = requestBody.encodeUtf8();

    let response = await ic.http_request({
      url = "https://api.openai.com/v1/chat/completions";
      max_response_bytes = ?8192;
      method = #post;
      headers = [
        { name = "Content-Type"; value = "application/json" },
        { name = "Authorization"; value = "Bearer PLACEHOLDER_API_KEY" },
      ];
      body = ?bodyBlob;
      transform = null;
      is_replicated = ?false;
    });

    switch (response.body.decodeUtf8()) {
      case null {
        "I'm sorry, the AI response could not be decoded. Please try again.";
      };
      case (?responseText) {
        AIMentorLib.parseResponseBody(responseText);
      };
    };
  };
};
