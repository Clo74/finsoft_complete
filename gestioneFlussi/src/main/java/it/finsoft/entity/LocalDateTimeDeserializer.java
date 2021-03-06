package it.finsoft.entity;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class LocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

	@Override
	public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt)
			throws IOException, JsonProcessingException {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

		LocalDateTime localDateTime = null;
		localDateTime = LocalDateTime.parse(p.getText(), formatter);

		return localDateTime;
	}
}