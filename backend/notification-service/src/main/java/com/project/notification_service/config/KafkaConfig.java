// package com.project.notification_service.config;

// import com.project.notification_service.dto.EventMessage;
// import org.apache.kafka.clients.consumer.ConsumerConfig;
// import org.apache.kafka.common.serialization.StringDeserializer;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
// import org.springframework.kafka.core.ConsumerFactory;
// import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
// import org.springframework.kafka.support.serializer.JsonDeserializer;

// import java.util.HashMap;
// import java.util.Map;

// @Configuration
// public class KafkaConfig {

//     @Value("${spring.kafka.bootstrap-servers}")
//     private String bootstrapServers;

//     @Value("${spring.kafka.consumer.group-id}")
//     private String groupId;

//     @Bean
//     public ConsumerFactory<String, EventMessage> consumerFactory() {
//         Map<String, Object> props = new HashMap<>();
//         props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
//         props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);

//         JsonDeserializer<EventMessage> deserializer = new JsonDeserializer<>(EventMessage.class);
//         deserializer.setRemoveTypeHeaders(false);
//         deserializer.addTrustedPackages("*");
//         deserializer.setUseTypeMapperForKey(true);

//         return new DefaultKafkaConsumerFactory<>(
//                 props,
//                 new StringDeserializer(),
//                 deserializer
//         );
//     }

//     @Bean
//     public ConcurrentKafkaListenerContainerFactory<String, EventMessage> kafkaListenerContainerFactory() {
//         ConcurrentKafkaListenerContainerFactory<String, EventMessage> factory =
//                 new ConcurrentKafkaListenerContainerFactory<>();
//         factory.setConsumerFactory(consumerFactory());
//         return factory;
//     }
// }